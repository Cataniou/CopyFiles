/**
 * Altere o valor da variavel enabled
 * true = habilitar o Script executando
 * false = desabilitar o Script
 */
const enabled = true;
if (enabled)
{

    //Caminho origem das pastas das Empresas
    const origim = 'C:\\Transferencia de arquivos\\';

    //Extensão dos aruivos que deseja mover 
    const ext = '.pdf';

    //Meses do ano
    let months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ", ];

    const fs = require('fs');

    fs.readdir(origim, (error, folders) => {
        if (error) throw error;
        if (folders) 
        {
            folders.forEach( folder => 
            {
                let dir = origim + folder + '\\';

                //Pasta que guarda os arquivos dentro da pasta das empresas
                fs.readdir((dir + '\\recepcao\\'), (err, fls) => {
                    if (err) console.log(err);
                    if (fls) 
                    {
                        fls.forEach( fl => 
                        {
                            //Alterar para a extensão do arquivo que quer transferir
                            if (fl.endsWith(ext))
                            {
                                let oldDirectory = dir + '\\recepcao\\' + fl;

                                //Data de modificação
                                let modDate = fs.statSync(oldDirectory).mtime
                                let fullDate = modDate.toLocaleDateString("pt-BR");
                                let year = fullDate.substring(6);
                                let month = fullDate.substring(4,5);

                                //Cria pasta recepcaobkp caso não exista
                                var newDirectory = dir + "\\recepcaobkp\\";
                                fs.mkdir(newDirectory, (erro) =>
                                {
                                    if (erro)
                                    {
                                        if (!erro.code.includes("EEXIST"))
                                        {
                                            console.log("Erro ao criar a pasta recepcaobkp! " + folder);
                                            console.log(erro);
                                        }
                                    }
                                    else {
                                        console.log('Sucesso ao criar a pasta de backup! ' + folder);
                                    }
                                })

                                //Cria pasta de BKP do Ano caso não exista
                                newDirectory = newDirectory + year + "\\";
                                fs.mkdir(newDirectory, (erro) =>
                                {
                                    if (erro)
                                    {
                                        if (!erro.code.includes("EEXIST"))
                                        {
                                            console.log("Erro ao criar a pasta do ano! " + folder);
                                            console.log(erro);
                                        }
                                    }
                                    else {
                                        console.log('Sucesso ao criar a pasta do ano! ' + folder);
                                    }
                                })

                                //Cria pasta do Mes do Ano caso não exista
                                newDirectory = newDirectory + months[month-1] + "\\";
                                fs.mkdir(newDirectory, (erro) =>
                                {
                                    if (erro)
                                    {
                                        if (!erro.code.includes("EEXIST"))
                                        {
                                            console.log("Erro ao criar a pasta do mês! " + folder);
                                            console.log(erro);
                                        }
                                    }
                                    else {
                                        console.log('Sucesso ao criar a pasta do mês! ' + folder);
                                    }
                                })

                                //Transfere o arquivo
                                fs.rename(oldDirectory, (newDirectory + fl), function (err) {
                                    if (err) console.log(err);
                                    console.log('Arquivo movido com sucesso - ' + fl);
                                })
                            }
                        })
                    }
                });
            })
        }
    });
}