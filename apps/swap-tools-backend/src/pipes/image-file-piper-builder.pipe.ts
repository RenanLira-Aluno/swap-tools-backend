import { ParseFilePipeBuilder } from "@nestjs/common";



export const ImageFilePiperBuilder =
  new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ })
    .build()
