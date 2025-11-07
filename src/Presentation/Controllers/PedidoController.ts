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
import { PedidoService } from "Application/Services/PedidoService";
import PedidoRequestDto from "Application/DTOs/Pedido/PedidoRequestDto";
import PedidoUpdateDto from "Application/DTOs/Pedido/PedidoUpdateDto";
import { JwtAuthGuard } from "jwt-auth.guard";

@ApiTags("Pedidos")
@Controller("pedidos")
export class PedidoController {
  constructor(private readonly _pedidoService: PedidoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Post()
  async create(@Res() res: Response, @Body() createDto: PedidoRequestDto) {
    const response = await this._pedidoService.create(createDto);
    return response.isSuccess
      ? res.status(HttpStatus.CREATED).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get()
  async getAll(@Res() res: Response) {
    const response = await this._pedidoService.getAll();
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del pedido" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get(":id")
  async getById(@Res() res: Response, @Param("id") id: string) {
    const response = await this._pedidoService.getById(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del pedido" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Put(":id")
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateDto: PedidoUpdateDto
  ) {
    const response = await this._pedidoService.update(id, updateDto);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del pedido" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Delete(":id")
  async delete(@Res() res: Response, @Param("id") id: string) {
    const response = await this._pedidoService.delete(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }
}
