const text = 'This is a text and it should be stored in a file';

Deno.writeTextFile('text.txt', text)
    .then(() => console.log('File created successfully.'))
    .catch((error: Error) => console.log(error));