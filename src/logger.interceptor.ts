// logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap, catchError, finalize, map } from "rxjs/operators";
import { Request, Response } from "express";

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<any>();
    const start = Date.now();
    if (res && typeof res.json === "function" && !res.__json_patched) {
      const original = res.json.bind(res);
      res.__json_patched = true; // bandera para no parchar dos veces
      let ip = "";
      res.json = (body: any) => {
        // Evita transformar HTML, streams o descargas
        const req = http.getRequest<any>();
        ip =
          req.ip ||
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress;

        return original(body);
      };
    }

    return next.handle().pipe(
      tap((data) => {
        //console.log("Response data:", data);
        console.log("Response data:", req.ip);
        console.log("Module from response:", data?.module);
        console.log("User from response:", data?.details);

        // Aquí puedes acceder a todos los datos del response
        const userId = data?.user?.id;
        console.log("ID usuario desde response:", userId);

        //guardar en auth

        // Eliminar el module del response si existe
        if (data && data.module) {
          delete data.module;
        }

        if (data && data.details) {
          delete data.details;
        }
      })
    );
  }
}
