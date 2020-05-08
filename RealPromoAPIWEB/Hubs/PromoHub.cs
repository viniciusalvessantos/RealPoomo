using Microsoft.AspNetCore.SignalR;
using RealPromoAPIWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealPromoAPIWEB.Hubs
{
    //RPC
    public class PromoHub : Hub
    {
        /*Cliente  - JS/C#/Java
         * RPC
         * - Cliente(JS) -> Hub(C#) (C# - CadastrarPromocao)
         * - Hub(C#) -> Cliente(JS) (JS - ReceberPromocao)
         */
        public async Task CadastrarPromocao(Promocao promocao) 
        {
            /*
             Banco
             Queue/ Scheduler....
             Notificar o Usuario(SignalR)
             */
            await Clients.Caller.SendAsync("CadastrardoSucesso"); // Notificar Caller -> Cadastro realizado com sucesso.
            await Clients.Others.SendAsync("ReceberPromocao", promocao); // Notificar Promoção Chegou

        }
    }
}
