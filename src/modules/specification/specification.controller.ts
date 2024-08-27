import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SpecificationService } from "./specification.service";

@Controller("specification")
@UseGuards(AuthGuard("jwt"))
export class SpecificationController {
  constructor(private specificationService: SpecificationService) {}
}
