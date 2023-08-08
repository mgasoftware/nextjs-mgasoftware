import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";

import { loginFail, loginPending, loginSuccess } from "~/store/loginSlice";
import checkValidForm from "~/utils/checkValidForm";
import { getUserSuccess } from "~/store/userSlice";

export interface LoginState {
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
}

const Home: NextPage = () => {
  const username = useRef<null | HTMLInputElement>(null)
  const password = useRef<null | HTMLInputElement>(null)
  const password2 = useRef<null | HTMLInputElement>(null)
  const [haveAccount, setHaveAccount] = useState(true)
  const [isValidForm, setIsValidForm] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: { login: LoginState }) => state.login);

  const login = async () => {
    dispatch(loginPending())
    const formEntries = {
      username: username.current?.value,
      password: password.current?.value
    }
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: username.current?.value,
        password: password.current?.value
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      localStorage.setItem("token", res.data?.access)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      dispatch(getUserSuccess({token:res.data?.access}))
      dispatch(loginSuccess())
      await router.push('../dashboard')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!checkValidForm(formEntries)) {
          setIsValidForm(false)
          window.scrollTo(0, 0)
        }
        dispatch(loginFail(error.message))
        console.log('error message: ', error.message);
        return error.message;
      } else {
        dispatch(loginFail('unexpected error'))
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  const register = async () => {
    const formEntries = {
      username: username.current?.value,
      password: password.current?.value,
      password2: password.current?.value
    }
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: username.current?.value,
        password: password.current?.value,
        password2: password.current?.value
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },)
      if (res.status === 201) {
        await login()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        if (!checkValidForm(formEntries)) {
          setIsValidForm(false)
          window.scrollTo(0, 0)
        }
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  return (
    <>
      <Head>
        <title>Learn@Home</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.containerLeft}>
          <h1 className={styles.title}>MGA Market</h1>
        </div>
        {haveAccount ? (
          <div className={styles.containerRight}>
            <h1 className={styles.connexionTitle}>Connexion</h1>
            <p className={styles.label}>Pseudo</p>
            <input type="text" name="username" className={styles.input} ref={username} />
            <p className={styles.label}>Mot de Passe</p>
            <input type="password" name="username" className={styles.input} ref={password} />
            <p className={styles.label}>Vous n&apos;avez pas encore de compte ? <a onClick={() => setHaveAccount(false)} className={styles.link}>Créer votre compte</a></p>
            {!isValidForm &&
              (<div className={styles.alertBanner}>
                <div className={styles.alertContent}>
                  Tes identifiants sont incorrects. Réessaye.
                </div>
              </div>)}
            {isLoading ? (<button disabled={true} className={styles.button}>Loading</button>) :
              (<button className={styles.button} onClick={() => void login()}>S&apos;identifier</button>)
            }
          </div>) : (
          <div className={styles.containerRight}>
            <h1 className={styles.connexionTitle}>Inscription</h1>
            <p className={styles.label}>Pseudo</p>
            <input type="text" name="username" className={styles.input} ref={username} />
            <p className={styles.label}>Mot de Passe</p>
            <input type="password" name="password" className={styles.input} ref={password} />
            <p className={styles.label}>Confirmez mot de passe</p>
            <input type="password" name="password2" className={styles.input} ref={password2} />
            <p className={styles.label}>Vous avez un compte ? <a onClick={() => setHaveAccount(true)} className={styles.link}>Identifiez-vous</a></p>
            {!isValidForm &&
              (<div className={styles.alertBanner}>
                <div className={styles.alertContent}>
                  Erreur d&apos;incription: <br />
                  Le pseudo doit comporter au 2 caractères.<br />
                  Le mot de passe doit comporter au moins 8 caractères et ne doit pas être commun.
                </div>
              </div>)}
            {isLoading ? (<button disabled={true} className={styles.button}>Loading</button>) :
              (<button className={styles.button} onClick={() => void register()}>Créer votre compte</button>)
            }
          </div>)}
      </main>
    </>
  );
};

export default Home;
