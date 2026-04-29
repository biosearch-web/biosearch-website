# Scope do Projeto BioSearch

## Visão geral

BioSearch é um aplicativo web voltado para reconhecimento e orientação sobre plantas a partir de uma foto enviada pelo usuário. A proposta é combinar análise de imagem com IA para entregar respostas úteis, rápidas e fáceis de entender.

## Problema que o projeto resolve

Muitas pessoas têm dificuldade para identificar uma planta ou entender se ela está saudável, se recebe luz suficiente, se está com excesso de água ou se apresenta sinais de pragas. O BioSearch organiza essas informações em uma única experiência visual e simples.

## Objetivo principal

Permitir que o usuário envie uma imagem de uma planta e receba uma análise com:

- espécie provável ou família botânica aproximada;
- descrição visual da planta;
- cuidados básicos;
- estado de saúde da planta;
- possíveis sinais de estresse, pragas ou deficiência;
- orientações práticas de manutenção.

## Fluxo do usuário

1. O usuário acessa a aplicação.
2. Envia uma foto da planta.
3. O sistema processa a imagem com IA.
4. A aplicação exibe um resumo com os principais achados.
5. O usuário pode consultar detalhes sobre cuidados e saúde da planta.

## Funcionalidades do MVP

- Tela inicial com identidade visual do projeto.
- Área para envio ou seleção de foto da planta.
- Resultado com leitura em linguagem natural.
- Seções para espécie, cuidados, saúde e observações.
- Interface responsiva para desktop e mobile.

## Dados apresentados ao usuário

O sistema deve priorizar informações como:

- nome comum e nome científico provável;
- nível de confiança da análise;
- necessidade de luz;
- frequência de rega;
- tipo de solo ou substrato;
- sinais visuais relevantes;
- alertas de saúde da planta;
- recomendações de manutenção.

## Fora do escopo inicial

- Diagnóstico veterinário ou agronômico definitivo.
- Garantia de identificação exata da espécie em todos os casos.
- Monitoramento contínuo por sensores.
- Cadastro avançado de usuários ou histórico complexo.
- Marketplace, fórum ou rede social.

## Considerações de produto

As respostas da IA devem ser tratadas como orientação informativa, não como laudo técnico. Quando houver incerteza, a interface deve indicar que a identificação é provável e não absoluta.

## Tecnologias base

- React
- Vite
- Tailwind CSS

## Critério de sucesso

O projeto será considerado bem-sucedido se o usuário conseguir enviar uma foto, entender rapidamente o resultado da análise e sair com orientações práticas sobre a planta.
