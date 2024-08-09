import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SettingsService } from "./settings.service";

@Controller("settings")
@UseGuards(AuthGuard("jwt"))
export class SettingsController {
  constructor(private settingsService: SettingsService) {}
}
