import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInForData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInForData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });

        history.push('/home');
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, verifique as credenciais.',
        });
      }
    },
    [signIn, history, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Telefonica" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/">Esqueci minha senha</Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
