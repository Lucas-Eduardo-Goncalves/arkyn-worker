import { StorageService } from "../../domain/services/storageService";

type InputProps = {
  id: string;
};

class DeleteLogFromStorageUseCase {
  constructor(private storageService: StorageService) {}

  async execute(input: InputProps) {
    const { id } = input;
    await this.storageService.deleteLog(id);
    return;
  }
}

export { DeleteLogFromStorageUseCase };
