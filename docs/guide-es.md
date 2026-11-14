# Technical English Companion · Guía en español

[中文](../README.md) · [日本語](guide-ja.md) · [한국어](guide-ko.md)

Esta extensión ayuda a aprender vocabulario de desarrollo de software mientras usas Codex o DeepSeek Harness (DSH). La versión `3.0.0` está dirigida a usuarios de chino, español, japonés y coreano en macOS. En DSH, el alcance verificado es la versión `0.2.2-rc.1`, la entrada dedicada y Flash con nivel High.

Si vienes del identificador anterior `technical-terms-en-zh` o `dsh-plugin-technical-terms-en-zh`, desactívalo antes de activar `technical-english-companion` o `dsh-plugin-technical-english-companion`. Mantén una sola copia habilitada. Puedes conservar tu instalación habitual y seguir el procedimiento siguiente en un entorno independiente.

## Cómo funciona

La explicación sigue el idioma de la conversación. Los términos técnicos seleccionados aparecen en inglés, con una definición breve en el idioma de la respuesta la primera vez. Ejemplo de formato esperado: `Cache (caché)`. En las menciones posteriores de la misma respuesta se usa `Cache`; en una nueva respuesta se vuelve a incluir la definición.

Puedes indicar otro idioma o pedir que no se añadan términos en inglés. Una petición limitada a «esta respuesta» no se extiende a la siguiente; una petición como «a partir de ahora» se mantiene dentro del alcance que indiques. El código, los comandos, las rutas y las citas literales se conservan tal como están.

## Instalar en Codex para Mac

1. Obtén y descomprime el ZIP común `technical-english-companion-3.0.0.zip`. El archivo `.tgz` está destinado únicamente a DSH.
2. En el apartado de complementos de Codex, añade un mercado de complementos usando la ruta absoluta de la carpeta descomprimida. Debe contener `.codex-plugin/plugin.json` y `.agents/plugins/marketplace.json`.
3. Busca el origen `Technical English Companion` e instala `technical-english-companion`. Comprueba la versión `3.0.0` y que esté habilitado. Mantén habilitado un solo origen de este complemento.
4. En la configuración de hooks, revisa `SessionStart`. El comando debe usar `/bin/cat` para leer `src/terminology.md` dentro de la carpeta instalada. Revisa el contenido y confía en el hook antes de usarlo.
5. Abre una conversación nueva para comprobar el resultado.

Documentación oficial de Codex: [empaquetado e instalación local](https://developers.openai.com/plugins/build/plugins) y [revisión de hooks](https://learn.chatgpt.com/docs/hooks).

## Instalar en DSH para Mac

Esta versión se ha probado con DSH `0.2.2-rc.1` en macOS. Las instalaciones por enlace a una carpeta no pueden resolver la interfaz del programa anfitrión; usa el archivo `.tgz` sin descomprimirlo.

1. Guarda `dsh-plugin-technical-english-companion-3.0.0.tgz` sin descomprimir.
2. En Terminal, sustituye la ruta de `DSH_HOME` por una carpeta de prueba independiente y la ruta del archivo por la de tu descarga.

```sh
export DSH_HOME="/absolute/path/to/isolated-dsh"
companion_dsh="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$companion_dsh" plugin --profile headless add "/absolute/path/to/dsh-plugin-technical-english-companion-3.0.0.tgz" --offline --ignore-scripts
"$companion_dsh" plugin --profile headless list --depth 0
```

3. Comprueba que la lista incluya `dsh-plugin-technical-english-companion` y la versión `3.0.0`. Instalar el paquete no activa por sí solo la entrada dedicada.
4. Necesitas una conexión existente compatible con Responses API (interfaz de solicitudes y respuestas estructuradas) y una Credential reference (nombre de una credencial ya guardada por DSH). El inicio de sesión de la aplicación no garantiza estos requisitos. Sin una conexión y una referencia compatibles, esta entrada no puede utilizarse; no necesitas abrir otra cuenta.
5. Crea `$DSH_HOME/companion-test.yml` con el contenido siguiente. Sustituye la ruta por la de tu almacén existente, la dirección por la de tu servicio compatible y `EXISTING_CREDENTIAL_REFERENCE` por el nombre existente. `apiKeyEnv` recibe ese nombre, nunca la clave secreta. No copies el contenido del almacén.

```yaml
- id: credentials
  disabled: false
  config:
    path: "/absolute/path/to/existing/.credentials.yaml"
- id: agent-default-model
  config:
    provider: technical-english-companion-deepseek
    model: deepseek-flash
- id: technical-english-companion-responses
  config:
    baseURL: "https://api.deepseek.com"
    apiKeyEnv: EXISTING_CREDENTIAL_REFERENCE
```

6. Desde una carpeta de trabajo de prueba, ejecuta la primera pregunta. Las solicitudes reales se facturan en la cuenta existente. Esta entrada usa Flash con nivel High; acumula la respuesta completa antes de mostrarla y no añade llamadas automáticas de corrección.

```sh
companion_pkg="$DSH_HOME/profiles/headless/node_modules/dsh-plugin-technical-english-companion"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --json "Explica para qué sirve la caché. Solo explica; no uses herramientas."
```

7. La salida contiene eventos JSON. Copia el `sessionId` del evento `"type":"session"` al valor de `companion_session` y continúa con el segundo comando. Conserva los dos argumentos `--patch` en cada turno; deben preceder a `--json`. Usar la misma carpeta sin `--session-id` crea otra conversación.

```sh
companion_session="session-REPLACE_WITH_THE_RETURNED_ID"
"$companion_dsh" headless \
  --patch "$companion_pkg/cordis.responses.patch.yml" \
  --patch "$DSH_HOME/companion-test.yml" \
  --session-id "$companion_session" --json "Da otro ejemplo de cuándo actualizar la caché. Solo explica; no uses herramientas."
```

La entrada dedicada es `technical-english-companion-responses`; su configuración desactiva la entrada predeterminada. Este procedimiento verifica el uso por terminal, y no equivale a una prueba completa de la interfaz de escritorio.

## Probar el uso

Haz una pregunta normal, sin pegar las reglas del complemento:

> Explica en tres frases para qué sirve la caché, qué ocurre cuando caduca y cuándo conviene actualizarla. Menciona la caché en cada frase. Solo explica; no leas archivos ni uses herramientas.

Comprueba que la respuesta esté en español, que la primera mención incluya una definición y que las siguientes usen el mismo nombre en inglés. Luego pregunta:

> Da otro ejemplo de cuándo actualizar la caché.

La nueva respuesta debe incluir de nuevo la definición en su primera mención. Para comprobar una excepción temporal, puedes pedir:

> Solo en esta respuesta, usa únicamente español, sin términos en inglés.

La siguiente pregunta normal vuelve al formato predeterminado.

## Desactivar o desinstalar

En Codex, usa el interruptor o la acción de desinstalación del complemento. Para quitar el paquete del perfil de prueba de DSH, usa el siguiente comando en la misma terminal. Abre una conversación nueva para comprobar el resultado.

```sh
"$companion_dsh" plugin --profile headless remove dsh-plugin-technical-english-companion
```

Para dejar de usar la entrada dedicada, omite ambos argumentos `--patch` en las conversaciones nuevas. Después de quitar el paquete, no vuelvas a cargar `cordis.responses.patch.yml` ni la configuración que selecciona su proveedor.

El complemento utiliza el modelo y la cuenta que ya tengas configurados. No crea una cuenta adicional ni guarda su propio historial de conversaciones, vocabulario o progreso. Licencia: [MIT](../LICENSE).
