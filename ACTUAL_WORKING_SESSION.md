## En esta sesion vamos a agregar una funcionalidad de daño en la pelota para poder hacer mas daño y destruir los bloques

-   Necesitamos agregar daño a la pelota, que pueda hacer mas daño mientras vamos avanzando.
-   De momento quiero que agregues si se destruye por completo un row se le sume una unidad de daño a la pelota, a que me refiero si destruyes todos la fila de 1s o 2s, se validaria si todos los bloques estan destruidos del avlor original o simplemente por el row.

-   IMPORTANTE: IMPLEMENTAR PASO A PASO SIN ADELANTARSE, YO EVALUARÉ Y HARÉ TEST DE SI CONTINUAMOS, tambien tienes que leer todos los pasos para saber como implementarse entre todos los pasos al ir avanzando en los pasos pero sin adelantarte

-   IMPORTANTE: NO ELIMINAR NI AFECTAR FUNCIONALIDADES PREVIAS SI NO TE LO PIDO YO, NO INVENTES NI ALUCINES COSAS QUE YO NO TE PEDÍ, no modifiques nada de lo existente.

-   IMPORTANTE: SIEMPRE AGREGAR LO QUE SE LOGRO EN GEMINI.MD Y SESSION_SUMMARY.MD (AQUI SI CON SU FECHA ACTUAL), DE LO QUE SE HIZO Y SE COMPLETÓ, HASTA QUE YO TE CONFIRME QUE ESTA FUNCIONANDO CORRECTAMENTE.

-   **PASOS A EJECUTAR (Hacer uno por uno, no adelantarse y preguntarme si funciona cada paso, SOLO HACER EXPLICITAMENTE ESTOS PASOS AUNQUE MAS ARRIBA TE HAYA CONTADO UNA IDEA GENERAL)**
    **1.- [COMPLETED] Ahora veo que ya esta implementado el console.log, puedes ayudarme a que cada vez que se detecte el row eliminado, se aumente el daño de la pelota por 1**
    **2.- [COMPLETED] Implementa el label para mostrar el daño de la pelota actualmente y que se vaya actualizando cada vez con la validacion del paso 1**
    **3.- [COMPLETED] Ahora que ya se aumenta el daño de la pelota, necesito que ese daño se aplique a los bloques, es decir, si tengo 4 de daño y choco con un bloque de 5 de vida, el bloque se queda con 1 de vida, y si el bloque tiene 4 o menos, el bloque desaparece.**