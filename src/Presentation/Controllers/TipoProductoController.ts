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
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { TipoProductoService } from "Application/Services/TipoProductoService";
import TipoProductoRequestDto from "Application/DTOs/TipoProducto/TipoProductoRequestDto";
import TipoProductoUpdateDto from "Application/DTOs/TipoProducto/TipoProductoUpdateDto";
import { JwtAuthGuard } from "jwt-auth.guard";

@ApiTags("Tipo de Productos")
@Controller("tipo-productos")
export class TipoProductoController {
  constructor(private readonly _tipoProductoService: TipoProductoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Post()
  async create(
    @Res() res: Response,
    @Body() createDto: TipoProductoRequestDto
  ) {
    const response = await this._tipoProductoService.create(createDto);
    return response.isSuccess
      ? res.status(HttpStatus.CREATED).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get()
  async getAll(@Res() res: Response) {
    const response = await this._tipoProductoService.getAll();
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({
    name: "id",
    type: String,
    description: "ID del tipo de producto",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get(":id")
  async getById(@Res() res: Response, @Param("id") id: string) {
    const response = await this._tipoProductoService.getById(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({
    name: "id",
    type: String,
    description: "ID del tipo de producto",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Put(":id")
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateDto: TipoProductoUpdateDto
  ) {
    const response = await this._tipoProductoService.update(id, updateDto);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({
    name: "id",
    type: String,
    description: "ID del tipo de producto",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Delete(":id")
  async delete(@Res() res: Response, @Param("id") id: string) {
    const response = await this._tipoProductoService.delete(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }
}
