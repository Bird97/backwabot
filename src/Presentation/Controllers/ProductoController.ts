import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  Put,
  Delete,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { ProductoService } from "Application/Services/ProductoService";
import ProductoRequestDto from "Application/DTOs/Producto/ProductoRequestDto";
import ProductoUpdateDto from "Application/DTOs/Producto/ProductoUpdateDto";
import { JwtAuthGuard } from "jwt-auth.guard";

import * as ExcelJS from "exceljs";
import { Response as ExpressResponse } from "express";
import { UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import * as fs from "fs";

@ApiTags("Productos")
@Controller("productos")
export class ProductoController {
  constructor(private readonly _productoService: ProductoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Post()
  async create(@Res() res: Response, @Body() createDto: ProductoRequestDto) {
    const response = await this._productoService.create(createDto);
    return response.isSuccess
      ? res.status(HttpStatus.CREATED).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get()
  async getAll(@Res() res: Response) {
    const response = await this._productoService.getAll();
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del producto" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get(":id")
  async getById(@Res() res: Response, @Param("id") id: string) {
    const response = await this._productoService.getById(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del producto" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Put(":id")
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateDto: ProductoUpdateDto
  ) {
    const response = await this._productoService.update(id, updateDto);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del producto" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Delete(":id")
  async delete(@Res() res: Response, @Param("id") id: string) {
    const response = await this._productoService.delete(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @Get("download/excel")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  async downloadTemplateProductsExcel(@Res() res: ExpressResponse) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Empleados");

    worksheet.columns = [
      { header: "nombre", key: "name", width: 15 },
      { header: "descripcion", key: "descripcion", width: 20 },
      { header: "precio", key: "precio", width: 25 },
      { header: "categoria", key: "categoria", width: 25 },
    ];

    // Aplica estilo a la fila de títulos (primera fila)
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // Blanco y negrita
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0B3C2E" }, // Vec'de
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Fila de ejemplo
    worksheet.addRow({
      name: "hamburguesa punta de anca",
      descripcion: "250gr de carne, pan casero...",
      precio: 25000,
      categoria: "hamburguesa",
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=productos.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  }

  @Post("upload/excel")
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth("access-token")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
        restaurante_id: { type: "string", example: "uuid-de-la-entidad" },
      },
    },
  })
  async uploadEmployeeDataExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body("restaurante_id") restaurante_id: string,
    @Res() res: ExpressResponse
  ) {
    const response = await this._productoService.processExcelUpload(
      file,
      restaurante_id
    );

    if (!response?.isSuccess) {
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    return res.status(HttpStatus.CREATED).json(response);
  }
}
