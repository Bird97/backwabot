import { Injectable, Inject } from "@nestjs/common";
import { GenericService } from "./GenericService";
import { ProductoEntity } from "../../Domain/Entities/ProductoEntity";
import ProductoRequestDto from "../DTOs/Producto/ProductoRequestDto";
import ProductoUpdateDto from "../DTOs/Producto/ProductoUpdateDto";
import ProductoResponseDto from "../DTOs/Producto/ProductoResponseDto";
import { IProductoRepository } from "../../Domain/Interfaces/IProductoRepository";
import { producto_mapper } from "../Mappers/producto.mapper";
import { PRODUCTO_REPOSITORY, TIPO_PRODUCTO_REPOSITORY } from "../tokens";
import Response from "./Response";
import Joi from "joi";
import * as ExcelJS from "exceljs";
import { ITipoProductoRepository } from "Domain/Interfaces/ITipoProductoRepository";
import { TipoProductoEntity } from "Domain/Entities/TipoProductoEntity";

@Injectable()
export class ProductoService extends GenericService<
  ProductoEntity,
  ProductoRequestDto,
  ProductoUpdateDto,
  ProductoResponseDto
> {
  constructor(
    @Inject(PRODUCTO_REPOSITORY)
    private readonly productoRepository: IProductoRepository,
    @Inject("TIPO_PRODUCTO_REPOSITORY")
    private readonly tipoProductoRepository: ITipoProductoRepository
  ) {
    super(
      productoRepository,
      producto_mapper,
      ProductoEntity,
      ProductoRequestDto,
      ProductoUpdateDto,
      ProductoResponseDto
    );
  }

  async bulkCreate(ProductoArray: ProductoRequestDto[]) {
    const results = [];
    for (const data of ProductoArray) {
      try {
        const result = await this.create(data);
        results.push({
          name: data.name,
          success: result.isSuccess,
          message: result.message,
        });
      } catch (error: any) {
        results.push({
          name: data.name,
          success: false,
          message: error.message,
        });
      }
    }
    return {
      success: results.every((r) => r.success),
      results,
    };
  }

  //función para subir excel
  async processExcelUpload(file: Express.Multer.File, id_restaurante: string) {
    const beneficiarySchema = Joi.object({
      name: Joi.string().required(),
      id_tipo: Joi.string().required(),
      id_restaurante: Joi.string().required(),
      //precio: Joi.string().number().,
      descripcion: Joi.string().required(),
    });

    if (!file) {
      return new Response(
        false,
        "No se subió ningún archivo.",
        null,
        "Archivo requerido"
      );
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.worksheets[0];

    const rows: ProductoRequestDto[] = [];
    const repeated: number[] = [];
    const seenInExcel = new Set<number>();
    const errors: { row: number; message: string }[] = [];    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      
      // Validar que el nombre del producto (celda 1) no esté vacío
      const nombreProducto = String(row.getCell(1).value ?? "").trim();
      if (!nombreProducto || nombreProducto === "" || nombreProducto === "null" || nombreProducto === "undefined") {
        continue; // Saltar esta fila si el nombre está vacío
      }

      // Validar que la categoría (celda 4) tenga un valor real
      const categoriaValue = String(row.getCell(4).value ?? "").trim();
      if (!categoriaValue || categoriaValue === "" || categoriaValue === "null" || categoriaValue === "undefined") {
        console.warn(`⚠️ Fila ${rowNumber}: Categoría vacía para producto "${nombreProducto}". Se omitirá este producto.`);
        continue; // Saltar esta fila si la categoría está vacía
      }

      // Comprobar si existe el tipo producto y obtener su id
      let tipoProducto = await this.tipoProductoRepository.find(
        categoriaValue,
        id_restaurante
      );
      
      // Si no existe ese tipo de producto, crearlo para ese restaurante
      if (!tipoProducto) {
        const nuevoTipo = new TipoProductoEntity();
        nuevoTipo.name = categoriaValue.toLowerCase();
        nuevoTipo.id_restaurante = id_restaurante;
        tipoProducto = await this.tipoProductoRepository.create(nuevoTipo);
        console.log('Nuevo tipo de producto creado:', tipoProducto);
      }

      // Crear el producto con datos validados
      const data: ProductoRequestDto = {
        name: nombreProducto,
        descripcion: String(row.getCell(2).value ?? "").trim(),
        id_restaurante: id_restaurante,
        id_tipo: tipoProducto?.id ? tipoProducto.id : "",
        precio: Number(row.getCell(3).value ?? "")
          ? Number(row.getCell(3).value ?? "")
          : 0,
      };

      rows.push(data);
    }

    const response = await this.bulkCreate(rows);

    let message = "";

    return new Response(response.success, message, {
      repeated,
      added: rows.length,
      results: response.results,
    });
  }
}
