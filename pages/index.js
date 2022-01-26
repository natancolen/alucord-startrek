import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';


function Titulo(props) {
  //console.log(props);
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["900"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

//Component react
// function HomePage() {
//     //JSX
//     return (
//         <div>
//         <GlobalStyle />
//         <Titulo tag="h1">Boas vindas de volta!</Titulo>
//         <h2>Discord - Alura Matrix</h2>
//     </div>)
//   }
//   export default HomePage

export default function PaginaInicial() {
  //const username = "natancolen";
  const [username, setUsername] = React.useState('natancolen');
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          backgroundColor: appConfig.theme.colors.primary[550],
          backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutTUdq8ZFERwiOBfnN1DV0rgONAd9vH_nKA&usqp=CAU)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguém submiteu o form');
              roteamento.push('/chat');
              //window.location.href = '/chat'
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[550],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function(event) {
                console.log('O usuário digitou ', event.target.value);
                //Onde está o valor?
                const valor = event.target.value;
                //Troca de valor da variável
                //atraves do react
                setUsername(valor);
              }}
            /> */}
            <TextField
              value={username}
              onChange={function (event) {
                console.log('O usuário digitou ', event.target.value);
                //Onde está o valor?
                if (event.target.value.length > 2) {
                  const valor = event.target.value;
                }
                //Troca de valor da variável
                //atraves do react
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[550],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[550],
                mainColorLight: appConfig.theme.colors.primary[650],
                mainColorStrong: appConfig.theme.colors.primary[660],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
