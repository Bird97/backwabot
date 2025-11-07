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
import { DetallePedidoService } from "Application/Services/DetallePedidoService";
import DetallePedidoRequestDto from "Application/DTOs/DetallePedido/DetallePedidoRequestDto";
import DetallePedidoUpdateDto from "Application/DTOs/DetallePedido/DetallePedidoUpdateDto";
import { JwtAuthGuard } from "jwt-auth.guard";

@ApiTags("Detalle de Pedidos")
@Controller("detalle-pedidos")
export class DetallePedidoController {
  constructor(private readonly _detallePedidoService: DetallePedidoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Post()
  async create(
    @Res() res: Response,
    @Body() createDto: DetallePedidoRequestDto
  ) {
    const response = await this._detallePedidoService.create(createDto);
    return response.isSuccess
      ? res.status(HttpStatus.CREATED).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get()
  async getAll(@Res() res: Response) {
    const response = await this._detallePedidoService.getAll();
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({
    name: "id",
    type: String,
    description: "ID del detalle de pedido",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get(":id")
  async getById(@Res() res: Response, @Param("id") id: string) {
    const response = await this._detallePedidoService.getById(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({
    name: "id",
    type: String,
    description: "ID del detalle de pedido",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Put(":id")
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateDto: DetallePedidoUpdateDto
  ) {
    const response = await this._detallePedidoService.update(id, updateDto);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({
    name: "id",
    type: String,
    description: "ID del detalle de pedido",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Delete(":id")
  async delete(@Res() res: Response, @Param("id") id: string) {
    const response = await this._detallePedidoService.delete(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }
}
