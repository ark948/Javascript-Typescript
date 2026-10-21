// Memory is automatically managed by Javascript

// Resource management is about managing resources that are not automatically handled by javascript

// if too many of these resources are left unhandled they may leak or cause excess memory usage

// Some examples of resources that need managing and properly closing:
// File handles
// Network connections
// Stream Readers

// for files always call fileHandle.close()

// Some network connections like WebSockets and RTCPeerConnection need to be closed, if no messages are transmitted

// If you don't call ReadableStreamDefaultReader.releaseLock(), the stream will be locked and does not permit another reader to consume it.


// Example of readable stream
const stream = new ReadableStream({
    start(controller) {
        controller.enqueue("a");
        controller.enqueue("b");
        controller.enqueue("c");
        controller.close();
    },
});

async function readUntil(stream, text) {
    const reader = stream.getReader();
    let chunk = await reader.read();

    while (!chunk.done && chunk.value !== text) {
        console.log(chunk);
        chunk = await reader.read();
    }
    // We forgot to release the lock here
}

readUntil(stream, "b").then(() => {
    const anotherReader = stream.getReader();
    // TypeError: ReadableStreamDefaultReader constructor can only accept readable streams that are not yet locked to a reader
});


// Solution: call releaseLock() with finally
async function readUntil(stream, text) {
    const reader = stream.getReader();
    try {
        let chunk = await reader.read();

        while (!chunk.done && chunk.value !== text) {
            console.log(chunk);
            chunk = await reader.read();
        }
    } finally {
        reader.releaseLock();
    }
}


