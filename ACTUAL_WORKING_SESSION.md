## En esta sesion vamos a agregar niveles, vamos a empezar con una estruturacion simple para mostrar una tienda para comprar powerups

-   Necesitamos agregar niveles que van a ser separados por tiendas.
-   Empezaremos primero con ciertas metas en la puntuación, de momento vamos hacerlo inicial de 50, es decir cuando lleguemos al score de 50 se tendra que mostrar una escena, se pausara el juego por así decirlo y parecera un menu para comprar cosas, de momento implementemos la logica inicial de los niveles con la puntuacion, voy a pasarte un texto para que entiendas mi idea, sera muy parecido a Balatro, tendremos niveles 1, 2 y 3, y oleadas que seria 1, 2 ... hasta el 8, cuando pasemos el nivel 3 al 4, seria el 1 y se suma una oleada mas, digamos si esteabamos en la oleada 1 sería entonces nivel 1, oleada 2.

-   Progresión de Puntuación (Comenzando en 50)

    Si la base es 50, la progresión para el primer nivel (Ante 1) es la siguiente:

        Small Blind: 50

        Big Blind: 75 (50 * 1.5)

        Boss Blind: 100 (50 * 2)

    Para las siguientes rondas, podemos seguir una progresión de dificultad ascendente similar a Balatro, con incrementos que no son lineales. A continuación, te presento una tabla con valores que podrías usar en tu juego. Estos valores están diseñados para mantener una curva de dificultad desafiante.
    Nivel (Ante)	Small Blind	    Big Blind	Boss Blind
    1	            50	            75	        100
    2	            120	            180	        240
    3	            220 	        330	        440
    4	            400	            600	        800
    5	            700	            1,050	    1,400
    6	            2,000	        3,000	    4,000
    7	            1,200	        1,800	    2,400
    8	            3,500	        5,250	    7,000

    Lógica para tu Código

    Para implementar esto en tu juego, la forma más eficiente es usar un array (o lista) de valores base, al igual que en el ejemplo anterior.
    Python

    # Array de puntuaciones requeridas para el Small Blind
    # Cada índice corresponde a un Ante (ej. indice 0 = Ante 1)
    small_blind_scores = [50, 120, 220, 400, 700, 1200, 2000, 3500]

    # Función para obtener la puntuación de un Ante específico
    def get_score(ante_number, blind_type):
        # Asegurarse de que el número de Ante sea válido
        if ante_number < 1 or ante_number > len(small_blind_scores):
            return None  # O manejar el error como prefieras

        # Obtener el índice del array
        index = ante_number - 1

        # Obtener la puntuación base del array
        base_score = small_blind_scores[index]

        # Calcular y devolver la puntuación según el tipo de ronda
        if blind_type == "small_blind":
            return base_score
        elif blind_type == "big_blind":
            return base_score * 1.5
        elif blind_type == "boss_blind":
            return base_score * 2.0
        else:
            return None  # Tipo de ronda inválido

    Este código es fácil de entender y de modificar. Si en el futuro decides cambiar la dificultad, solo necesitarás ajustar los valores en la lista small_blind_scores, sin necesidad de reescribir la lógica de cálculo.

-   IMPORTANTE: IMPLEMENTAR PASO A PASO SIN ADELANTARSE, YO EVALUARÉ Y HARÉ TEST DE SI CONTINUAMOS, tambien tienes que leer todos los pasos para saber como implementarse entre todos los pasos al ir avanzando en los pasos pero sin adelantarte

-   IMPORTANTE: NO ELIMINAR NI AFECTAR FUNCIONALIDADES PREVIAS SI NO TE LO PIDO YO, NO INVENTES NI ALUCINES COSAS QUE YO NO TE PEDÍ, no modifiques nada de lo existente.

-   IMPORTANTE: SIEMPRE AGREGAR LO QUE SE LOGRO EN GEMINI.MD Y SESSION_SUMMARY.MD (AQUI SI CON SU FECHA ACTUAL), DE LO QUE SE HIZO Y SE COMPLETÓ, HASTA QUE YO TE CONFIRME QUE ESTA FUNCIONANDO CORRECTAMENTE.

-   **PASOS A EJECUTAR (Hacer uno por uno, no adelantarse y preguntarme si funciona cada paso, SOLO HACER EXPLICITAMENTE ESTOS PASOS AUNQUE MAS ARRIBA TE HAYA CONTADO UNA IDEA GENERAL)**
    **1.- Ayudame a implementar la logica de niveles segun a lo que te dije mas arriba y me muestres dos nuevos labels en donde diga nivel y oleada, empezamos con nivel 1 y oleada 1 y vamos aumentando esos niveles segun la logica comentada anteriormente, NO HAGAS NINGUNA IMPLEMENTACION DE ESCENA DE LA TIENDA, SOLO PON UN CONSOLE.LOG DONDE IMPRIMA AQUI SE MUESTRA LA TIENDA, la implementacion sera en en el futuro**