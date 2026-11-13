let centro = document.getElementById("centro");
        let izquierda = document.getElementById("izquierda");
        let derecha = document.getElementById("derecha");
        let espacios = [];
        let numeroEspacio = 1;

        function crearEspacio(contenedor) {
            let espacio = document.createElement("button");
            espacio.className = "espacio";
            espacio.innerHTML = numeroEspacio;
            espacio.ocupado = Math.random() < 0.5;
            pintar(espacio);
            espacio.onclick = function() {
                espacio.ocupado = !espacio.ocupado;
                pintar(espacio);
                actualizarDashboard();
            };
            contenedor.appendChild(espacio);
            espacios.push(espacio);
            numeroEspacio++;
        }

        for (let f = 0; f < 10; f++) {
            let fila = document.createElement("div");
            fila.className = "fila";
            for (let c = 0; c < 8; c++) {
                crearEspacio(fila);
            }

            centro.appendChild(fila);
            if (f == 1 || f == 3 || f == 5 || f == 7) {
                let pasillo = document.createElement("div");
                pasillo.className = "pasillo";
                if (f == 1 || f == 5) {
                    pasillo.innerHTML = "→   →   →  →";
                } else {
                    pasillo.innerHTML = "←   ←   ←  ←";
                }
                centro.appendChild(pasillo);
            }
        }

        for (let i = 0; i < 13; i++) {
            crearEspacio(izquierda);
        }
        for (let i = 0; i < 13; i++) {
            crearEspacio(derecha);
        }

        function pintar(espacio) {
            if (espacio.ocupado) {
                espacio.style.backgroundColor = "red";
            } else {
                espacio.style.backgroundColor = "green";
            }
        }

        function actualizarDashboard() {
            let ocupados = 0;
            for (let i = 0; i < espacios.length; i++) {
                if (espacios[i].ocupado) {
                    ocupados++;
                }
            }
            let disponibles = espacios.length - ocupados;
            let porcentaje = Math.round(ocupados * 100 / espacios.length);
            document.getElementById("total").innerHTML = espacios.length;
            document.getElementById("ocupados").innerHTML = ocupados;
            document.getElementById("disponibles").innerHTML = disponibles;
            document.getElementById("porcentaje").innerHTML = porcentaje + "%";
        }

        function cambioAutomatico() {
            let numero = Math.floor(Math.random() * espacios.length);
            espacios[numero].ocupado = !espacios[numero].ocupado;
            pintar(espacios[numero]);
            actualizarDashboard();
        }

        actualizarDashboard();
        setInterval(cambioAutomatico, 3000);