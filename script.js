window.onload = function(){
	inicio();
}

function inicio(){
	var descifra = false;
	function codifica(descifrar)
	{
		var NumeroText  = nom_div("caja_2").value;
		var clave = NumeroText;
		var indiceX  = nom_div("caja_3").value;
		var indiceY  = nom_div("caja_4").value;
		var texto = nom_div("caja_1").value;
		if (NumeroText < 0 ){
			alert("La clave debe ser mayor a 0. ");
		}
		if(descifrar==true){
			var alfabeto=["Á","É","Í","Ó","Ú","á","é","í","ó","ú",
						"A","B","C","D","E","F","G","H","I","J",
						"K","L","M","N","Ñ","O","P","Q","R","S",
						"T","U","V","W","X","Y","Z","0","1","2",
						"3","4","5","6","7","8","9"," ",".",",",
						";","-","+","*","|","/","a","b","c","d",
						"e","f","g","h","i","j","k","l","m","n",
						"ñ","o","p","q","r","s","t","u","v","w",
						"x","y","z","@",'"',"'","¡","!","?","¿"];
					
			var alfa = [["Á","É","Í","Ó","Ú","á","é","í","ó","ú"],
						["A","B","C","D","E","F","G","H","I","J"],
						["K","L","M","N","Ñ","O","P","Q","R","S"],
						["T","U","V","W","X","Y","Z","0","1","2"],
						["3","4","5","6","7","8","9"," ",".",","],
						[";","-","+","*","|","/","a","b","c","d"],
						["e","f","g","h","i","j","k","l","m","n"],
						["ñ","o","p","q","r","s","t","u","v","w"],
						["x","y","z","@",'"',"'","¡","!","?","¿"]];
				
			var k = 0, l = 0, pos = 0, posi = 0, borrarPos = 0;
			var nclave = new Array();
			var nnclave = new Array();
			var nuevoAlfa = new Array();
			var text_cifrado = new Array();
			
			//caracteres repetidos e invalidos en la clave
			nclave[0] = clave.charAt(0);
			for(var o = 0; o < clave.length; o++){
				if (nclave.indexOf(clave.charAt(o)) < 0 && alfabeto.indexOf(clave.charAt(o)) >= 0){ 
					nclave[o] = clave.charAt(o);
				}
			}
			
			//pasa de nclave (vector ) a clave string
			clave="";
			for(var r=0; r < nclave.length; r++){
				if(nclave[r] != null){
					clave+=nclave[r];
				}
			}
			
			//pasa de indices string a indices vector
			indix = indiceX;
			indiy = indiceY;
			for(var r=0; r < indix.length; r++){
				indiceX[r]=indix.charAt(r);
			}
			for(var r=0; r < indiy.length; r++){
				indiceY[r]=indiy.charAt(r);
			}
			
			//elimina la clave del alfabeto
			for(var m = 0; m < clave.length; m++){
				pos = alfabeto.indexOf(clave.charAt(m));
				alfabeto.splice(pos, 1); 
			}	
			
			//Valida los indices X Y
			var nindiceX = new Array();
			var nindiceY = new Array();
			nindiceX[0] = indiceX.charAt(0);
			for(var o = 0; o < indiceX.length; o++){
				if (nindiceX.indexOf(indiceX.charAt(o)) < 0 && alfabeto.indexOf(indiceX.charAt(o)) >= 0){  
					nindiceX[o] = indiceX.charAt(o);
				}
			}
			nindiceY[0] = indiceY.charAt(0);
			for(var o = 0; o < indiceY.length; o++){
				if (nindiceY.indexOf(indiceY.charAt(o)) < 0 && alfabeto.indexOf(indiceY.charAt(o)) >= 0){  
					nindiceY[o] = indiceY.charAt(o);
				}
			}

			//////////////////////////////////////////// Desifrado /////////////////////////////////////////////

			if(nindiceX.length == indiceX.length && nindiceY.length == indiceY.length){
				//llena la matriz con el nuevo alfabeto ordenado
				for (var i = 0; i < 9; i++){
					for (var j = 0; j < 10; j++){
						if(k < clave.length){
							alfa[i][j] = clave.charAt(k);
							k = k+1;
						}else{
							alfa[i][j] = alfabeto[l];
							l=l+1;
						}
					}
				}

							////////////////////////////////// Permutacion /////////////////////////////////////////////

				var alfa_permu=["Á","É","Í","Ó","Ú","á","é","í","ó","ú",
						"A","B","C","D","E","F","G","H","I","J",
						"K","L","M","N","Ñ","O","P","Q","R","S",
						"T","U","V","W","X","Y","Z","0","1","2",
						"3","4","5","6","7","8","9"," ",".",",",
						";","-","+","*","|","/","a","b","c","d",
						"e","f","g","h","i","j","k","l","m","n",
						"ñ","o","p","q","r","s","t","u","v","w",
						"x","y","z","@",'"',"'","¡","!","?","¿"];
				//pasa clave a permuta para coger las posiciones dentro del alfabeto
				var permuta = new Array();
				for(var r = 0; r < clave.length; r++){
					permuta[r] = alfa_permu.indexOf(clave.charAt(r));
				}

				//organiza texto cifrado con las posiciones de permuta
				var text_cifra = new Array();
				var limite = texto.length;
				var fila = limite/permuta.length;
				var k = 0;
				var texto_permu = "";
				for (var j = 0; j < fila; j++) {
					text_cifra[j] = new Array();
					for(var i = 0; i < permuta.length; i++){
						text_cifra[j][permuta[i]] = texto.charAt(k);
						//console.log('permuta',permuta);
						k = k + 1;
					}
				}

				texto_permu = text_cifra.toString();
				texto_permu = texto_permu.replace(/,/g,"");
				document.getElementById('tabla2').innerHTML = texto_permu; 
				
				var x=0, y=0;
				//dexcifrado
				var u=0;
				var a = 1;
				for (var i = 0; i < texto_permu.length; i = i+a) {
					if(indiceY.indexOf(texto_permu.charAt(i))>=0 && indiceX.indexOf(texto_permu.charAt(i+1))>=0){
						x = indiceY.indexOf(texto_permu.charAt(i));
						y = indiceX.indexOf(texto_permu.charAt(i+1));
						text_cifrado[u] = alfa[x][y];
						u = u+1;
						a=2;
						console.log(text_cifrado);
					}else{
						text_cifrado[u] = texto_permu.charAt(i);
						u = u+1;
						a=1;
					}
				}
				
				//imprime la matriz
				var tabla = '<table style=" width="5px"; border="1";>';		
				for(var x = 0; x < 10; x++){
					tabla += '<tr>';
					for(var y = 0; y < 11; y++){
						if(x==0 && y==0){
							tabla +='<td>..</td>';
						}else{
							if(x==0){
								tabla+='<th>'+indiceX.charAt(y-1)+'</th>';
							}else{
								if(y==0){
									tabla += '<th>'+indiceY.charAt(x-1)+'</th>';
								}else{
									if(text_cifrado.indexOf(alfa[x-1][y-1])>0){
										tabla += '<td  bgcolor="#5D7B9D">'+alfa[x-1][y-1]+'</td>';
									}else{
										tabla += '<td >'+alfa[x-1][y-1]+'</td>';
									}
								}
							}
						}
					}
					tabla +='</tr>';
				}
				tabla += '</table>';
				document.getElementById('matriz').innerHTML = tabla; 

				//Ordena el texto cifrado de vector a string
				var cifrado=text_cifrado;
				text_cifrado="";
				for(var i = 0; i < cifrado.length; i++){
					text_cifrado += cifrado[i];
				}
				nom_div("tabla").innerHTML = text_cifrado;
				
			}else{
				text_cifrado = "Caracteres Invalidos en la clave o indices";
				nom_div("tabla").innerHTML = texto_permu;
			}
		
		}else{	
			nom_div("tabla").innerHTML = realizaCesar(texto, clave, indiceX, indiceY);
		}
	}
	
	function realizaCesar(texto, clave, indiceX, indiceY){
		
		var alfabeto=["Á","É","Í","Ó","Ú","á","é","í","ó","ú",
					"A","B","C","D","E","F","G","H","I","J",
					"K","L","M","N","Ñ","O","P","Q","R","S",
					"T","U","V","W","X","Y","Z","0","1","2",
					"3","4","5","6","7","8","9"," ",".",",",
					";","-","+","*","|","/","a","b","c","d",
					"e","f","g","h","i","j","k","l","m","n",
					"ñ","o","p","q","r","s","t","u","v","w",
					"x","y","z","@",'"',"'","¡","!","?","¿"];
					
		var alfa = [["Á","É","Í","Ó","Ú","á","é","í","ó","ú"],
					["A","B","C","D","E","F","G","H","I","J"],
					["K","L","M","N","Ñ","O","P","Q","R","S"],
					["T","U","V","W","X","Y","Z","0","1","2"],
					["3","4","5","6","7","8","9"," ",".",","],
					[";","-","+","*","|","/","a","b","c","d"],
					["e","f","g","h","i","j","k","l","m","n"],
					["ñ","o","p","q","r","s","t","u","v","w"],
					["x","y","z","@",'"',"'","¡","!","?","¿"]];
			
		var k = 0, l = 0, pos = 0, posi = 0, borrarPos = 0;
		var nclave = new Array();
		var nnclave = new Array();
		var nuevoAlfa = new Array();
		var text_cifrado = new Array();
		
		//caracteres repetidos e invalidos en la clave
		nclave[0] = clave.charAt(0);
		for(var o = 0; o < clave.length; o++){
			if (nclave.indexOf(clave.charAt(o)) < 0 && alfabeto.indexOf(clave.charAt(o)) >= 0){  
				nclave[o] = clave.charAt(o);
			}
		}
		
		//pasa de nclave vector a clave string
		clave="";
		for(var r=0; r < nclave.length; r++){
			if(nclave[r] != null){
				clave+=nclave[r];
			}
		}
		
		//elimina la clave del alfabeto
		for(var m = 0; m < clave.length; m++){
			pos = alfabeto.indexOf(clave.charAt(m));
			alfabeto.splice(pos, 1); 
		}	
		
		//Valida los indices X Y
		var nindiceX = new Array();
		var nindiceY = new Array();
		nindiceX[0] = indiceX.charAt(0);
		for(var o = 0; o < indiceX.length; o++){
			if (nindiceX.indexOf(indiceX.charAt(o)) < 0 && alfabeto.indexOf(indiceX.charAt(o)) >= 0){  
				nindiceX[o] = indiceX.charAt(o);
			}
		}
		nindiceY[0] = indiceY.charAt(0);
		for(var o = 0; o < indiceY.length; o++){
			if (nindiceY.indexOf(indiceY.charAt(o)) < 0 && alfabeto.indexOf(indiceY.charAt(o)) >= 0){  
				nindiceY[o] = indiceY.charAt(o);
			}
		}
		if(nindiceX.length == indiceX.length && nindiceY.length == indiceY.length){
			//llena la matriz con el nuevo alfabeto ordenado
			for (var i = 0; i < 9; i++){
				for (var j = 0; j < 10; j++){
					if(k < clave.length){
						alfa[i][j] = clave.charAt(k);
						k = k+1;
					}else{
						alfa[i][j] = alfabeto[l];
						l=l+1;
					}
				}
			}

			//cifrado
			var u=0;
			var ban=0;
			for (var i = 0; i < texto.length; i++) {
				if(alfabeto.indexOf(texto.charAt(i))<0 && nclave.indexOf(texto.charAt(i))<0){
					posi += texto.charAt(i);
					//console.log(alfabeto.indexOf(texto.charAt(i)));
					ban=1;
				}
				for(var x = 0; x < 9; x++){
					for(var y = 0; y < 10; y++){
						if(texto.charAt(i) == alfa[x][y]){
							posi += indiceY.charAt(x);
							posi += indiceX.charAt(y);
							ban=1;
						}
						text_cifrado[u] = posi;
						u = u+1;
					}					
				}
			}
			
			//imprime la matriz
			var tabla = '<table style=" width="5px"; border="1";>';		
			for(var x = 0; x < 10; x++){
				tabla += '<tr>';
				for(var y = 0; y < 11; y++){
					if(x==0 && y==0){
						tabla +='<td>..</td>';
					}else{
						if(x==0){
							tabla+='<th>'+indiceX.charAt(y-1)+'</th>';
						}else{
							if(y==0){
								tabla += '<th>'+indiceY.charAt(x-1)+'</th>';
							}else{
								if(texto.indexOf(alfa[x-1][y-1])>0){
									tabla += '<td  bgcolor="#5D7B9D">'+alfa[x-1][y-1]+'</td>';
								}else{
									tabla += '<td>'+alfa[x-1][y-1]+'</td>';
								}
							}
						}
					}
				}
				tabla += '</tr>';
			}
			tabla += '</table>';
			document.getElementById('matriz').innerHTML = tabla; 

			//Ordena el texto cifrado
			var cifrado=text_cifrado[text_cifrado.length-1];
			var cifradito="";
			for(var x = 1; x < cifrado.length; x++){
				cifradito+=cifrado.charAt(x);
			}
			
			////////////////////////////////// Permutacion /////////////////////////////////////////////
			var alfabeto=["Á","É","Í","Ó","Ú","á","é","í","ó","ú",
					"A","B","C","D","E","F","G","H","I","J",
					"K","L","M","N","Ñ","O","P","Q","R","S",
					"T","U","V","W","X","Y","Z","0","1","2",
					"3","4","5","6","7","8","9"," ",".",",",
					";","-","+","*","|","/","a","b","c","d",
					"e","f","g","h","i","j","k","l","m","n",
					"ñ","o","p","q","r","s","t","u","v","w",
					"x","y","z","@",'"',"'","¡","!","?","¿"];
			//pasa clave a permuta para coger las posiciones dentro del alfabeto
			var permuta = new Array();
			for(var r = 0; r < clave.length; r++){
				permuta[r] = alfabeto.indexOf(clave.charAt(r));
			}

			//organiza texto cifrado con las posiciones de permuta
			var text_cifrado = new Array();
			var limite = cifradito.length;
			var fila = limite/permuta.length;
			var k = 0;
			var texto_permu = "";
			for (var j = 0; j < fila; j++) {
				text_cifrado[j] = new Array();
				for(var i = 0; i < permuta.length; i++){
					text_cifrado[j][permuta[i]] = cifradito.charAt(k);
					//console.log('permuta',permuta);
					k = k + 1;
				}
			}

			texto_permu = text_cifrado.toString();
			texto_permu = texto_permu.replace(/,/g,"");
			document.getElementById('tabla2').innerHTML = texto_permu; 
			return cifradito;
		}else{
			var incorrecto="Caracteres Invalidos en la clave o indices";
			return incorrecto;
		}
		
	}

	nom_div("caja_1").addEventListener('keyup', function(event)
	{
		codifica(descifra);
	});
 
	nom_div("accion").addEventListener('change', function(event)
	{
		if(this.value == 1)
		{
			descifra = false;
		}
		else
		{
			descifra = true;
		}
		nom_div("caja_1").value = "";
		nom_div("tabla").innerHTML = "";
	});
	
	function nom_div(id)
	{
		return document.getElementById(id);
	}

}