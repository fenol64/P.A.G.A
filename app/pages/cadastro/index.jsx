import React from 'react';
import { Button } from 'root/components/LayoutComponents';

// import { Container } from './styles';

function cadastro() {
  return (
    <div>
        <header className="modal-header bg-blue text-light border-0 p-3 position-relative rounded-bottom-5">
              <h2 className="navbar-brand text-uppercase text-center w-100 m-2">
                Bem-vindo ao P.A.G.A!
              </h2>
        </header>
        <div className="container">

        <div className="row">
            <div className="col-1">
            <Button
                type="button"
                color="transparent"
                label=""
                iconName="fal fa-arrow-left"
                className="btn-block w-100"
                size="sm"
                rounded="pill p-3"
                data-bs-dismiss="modal"
                onClick={() => window.history.back()}
            />
        </div>
        </div>
        </div>
        <div className="modal-body p-4">
<form className="container my-4">
            <h3 className="text-center">Cadastro de usuário</h3>
  <div className="row">
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="name" className="form-label">Nome</label>
      <input type="text" className="form-control" id="name" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-control" id="email" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
        <label htmlFor="user_type" className="form-label">Gênero</label>
        <select
        className="mb-3 col-12 col-md-6 form-select"
        id="user_gender" required>
            <option value="" disabled selected>Selecione o gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="non-binary">Não-binário</option>
            <option value="outro">Outro</option>
        </select>
    </div>
    <div className="mb-3 col-12 col-md-6">
        </div>
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="password" className="form-label">Senha</label>
      <input type="password" className="form-control" id="password" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
        <label htmlFor="confirm_password" className="form-label">Confirmar Senha</label>
        <input type="password" className="form-control" id="confirm_password" required />
    </div>
    <div className="mb-3 col-12">
      <label htmlFor="bio" className="form-label">Bio</label>
      <textarea className="form-control" id="bio" rows="3" required></textarea>
    </div>
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="address_cep" className="form-label">CEP</label>
      <input type="text" className="form-control" id="address_cep" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
        </div>
    <div className="mb-3 col-12 col-md-9">
      <label htmlFor="address_street" className="form-label">Rua</label>
      <input type="text" className="form-control" id="address_street" required />
    </div>
    <div className="mb-3 col-12 col-md-3">
      <label htmlFor="address_number" className="form-label">Número</label>
      <input type="text" className="form-control" id="address_number" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="address_neighborhood" className="form-label">Bairro</label>
      <input type="text" className="form-control" id="address_neighborhood" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="address_city" className="form-label">Cidade</label>
      <input type="text" className="form-control" id="address_city" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="address_state" className="form-label">Estado</label>
      <input type="text" className="form-control" id="address_state" required />
    </div>
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="address_complement" className="form-label">Complemento</label>
      <input type="text" className="form-control" id="address_complement" />
    </div>
    <div className="mb-3 col-12">
      <Button
        type="submit"
        color="primary"
        label="cadastrar"
        iconName="fal fa-plus"
        className="btn-block w-100 mt-3"
        size="sm"
        rounded="pill p-3"
      />
    </div>
  </div>
</form>
{/* // ...existing code...
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="password" required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='bio' className='form-label'>Bio</label>
                    <textarea className='form-control' id='bio' rows='3' required></textarea>
                </div>
                <div className='mb-3'>
                    <label htmlFor='address_cep' className='form-label'>CEP</label>
                    <input type='text' className='form-control' id='address_cep' required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='address_street' className='form-label'>Rua</label>
                    <input type='text' className='form-control' id='address_street' required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='address_number' className='form-label'>Número</label>
                    <input type='text' className='form-control' id='address_number' required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='address_neighborhood' className='form-label'>Bairro</label>
                    <input type='text' className='form-control' id='address_neighborhood' required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='address_city' className='form-label'>Cidade</label>
                    <input type='text' className='form-control' id='address_city' required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='address_state' className='form-label'>Estado</label>
                    <input type='text' className='form-control' id='address_state' required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='address_complement' className='form-label'>Complemento</label>
                    <input type='text' className='form-control' id='address_complement' />
                </div>

                                  <Button
                                  type="submit"
                                    color="primary"
                                    label="cadastrar"
                                    iconName="fal fa-plus"
                                    className="btn-block w-100"
                                    size="sm"
                                    rounded="pill p-3"
                                  />
            </form> */}
        </div>
        <div className="container">
        {/* create a back button */}
        </div>
    </div>
  );
}

export default cadastro;