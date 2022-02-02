import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzc2MzI4OCwiZXhwIjoxOTU5MzM5Mjg4fQ.YiC7m6vd7UQarZPvOpqGKshax2cDkDFC8rNITvTwes0'; 
const SUPABESE_URL = 'https://lbjzlwfotmcczjtfhjgo.supabase.co';
const supabaseClien = createClient(SUPABESE_URL, SUPABASE_ANON_KEY);



export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClien.from('mensagens').select('*').order('id', {ascending: false}).then(({data}) => {
      console.log('Dados da consulta: ', data);
      setListaDeMensagens(data);
    });
  }, []);

  /*
    // Usuário
    - Usuário digita o campo textarea
    - Aperta Enter para enviar
    - Tem que adicionar o texto na listagem

    //Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usar o setState {ter if para que seja enter pra limpar a variável}
    - [X] Lista de messagem

    */

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: "vanessametonini",
      texto: novaMensagem,
    };
    supabaseClien.from('mensagens').insert([mensagem]).then(({data}) => {
      //console.log('Criando mensagem: ', data);
      setListaDeMensagens([data[0], ...listaDeMensagens]);
    });

    
    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[550],
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutTUdq8ZFERwiOBfnN1DV0rgONAd9vH_nKA&usqp=CAU)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
            }}      
        >
          <MessageList mensagens={listaDeMensagens} />

          {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
            >
            <TextField 
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();

                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}    
            />
            <Button label="Ok"
              onChange={(e) => {
                const valor = e.target.value;
                setMensagem(valor);
              }}
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
                console.log(event);
              }}
              styleSheet={{
                height: "40px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200]
              }}
            />
                      
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  //console.log("MessageList", props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}

function BotaoEnviarMensagem(prop) {
    return (
        <Box backgroundColor="white"
            styleSheet={{
            width: "3.5%", border: "0", resize:"none", borderRadius: "12px", aliginItems: "center",
                   
        }}>
        
            <Button label="Ok" />
            
        </Box>
    );
}
