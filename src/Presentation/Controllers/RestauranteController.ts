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
import { RestauranteService } from "Application/Services/RestauranteService";
import RestauranteRequestDto from "Application/DTOs/Restaurante/RestauranteRequestDto";
import RestauranteUpdateDto from "Application/DTOs/Restaurante/RestauranteUpdateDto";
import { JwtAuthGuard } from "jwt-auth.guard";

@ApiTags("Restaurantes")
@Controller("restaurantes")
export class RestauranteController {
  constructor(private readonly _restauranteService: RestauranteService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Post()
  async create(@Res() res: Response, @Body() createDto: RestauranteRequestDto) {
    const response = await this._restauranteService.create(createDto);
    return response.isSuccess
      ? res.status(HttpStatus.CREATED).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get()
  async getAll(@Res() res: Response) {
    const response = await this._restauranteService.getAll();
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del restaurante" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get(":id")
  async getById(@Res() res: Response, @Param("id") id: string) {
    const response = await this._restauranteService.getById(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del restaurante" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Put(":id")
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateDto: RestauranteUpdateDto
  ) {
    const response = await this._restauranteService.update(id, updateDto);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del restaurante" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Delete(":id")
  async delete(@Res() res: Response, @Param("id") id: string) {
    const response = await this._restauranteService.delete(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }
}
