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
import { MesaService } from "Application/Services/MesaService";
import MesaRequestDto from "Application/DTOs/Mesa/MesaRequestDto";
import MesaUpdateDto from "Application/DTOs/Mesa/MesaUpdateDto";
import { JwtAuthGuard } from "jwt-auth.guard";

@ApiTags("Mesas")
@Controller("mesas")
export class MesaController {
  constructor(private readonly _mesaService: MesaService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Post()
  async create(@Res() res: Response, @Body() createDto: MesaRequestDto) {
    const response = await this._mesaService.create(createDto);
    return response.isSuccess
      ? res.status(HttpStatus.CREATED).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get()
  async getAll(@Res() res: Response) {
    const response = await this._mesaService.getAll();
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID de la mesa" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get(":id")
  async getById(@Res() res: Response, @Param("id") id: string) {
    const response = await this._mesaService.getById(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID de la mesa" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Put(":id")
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateDto: MesaUpdateDto
  ) {
    const response = await this._mesaService.update(id, updateDto);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID de la mesa" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Delete(":id")
  async delete(@Res() res: Response, @Param("id") id: string) {
    const response = await this._mesaService.delete(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }
}
