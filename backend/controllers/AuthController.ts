import { Route, Tags, Post, Body, Controller } from 'tsoa';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { LoginRequestDTO, LoginResponseDTO } from '../models/Auth';

@Route('api/auth')
@Tags('Autenticação')
export class AuthController extends Controller {
  private repository = new UsuarioRepository();

  @Post('login')
  public async login(@Body() requestBody: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { email, token } = requestBody;

    // Buscar usuário pelo email
    const usuario = await this.repository.findByEmail(email);

    if (!usuario) {
      this.setStatus(401);
      throw new Error('E-mail ou Token inválidos');
    }

    if (usuario.senha !== token && usuario.token !== token) {
      this.setStatus(401);
      throw new Error('E-mail ou Token inválidos');
    }

    // Omitir a senha (token) da resposta
    const { senha, token: _token, ...usuarioData } = usuario;

    return {
      usuario: usuarioData
    };
  }
}
