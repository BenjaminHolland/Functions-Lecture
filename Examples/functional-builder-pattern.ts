
interface ServerEndpoint {
    host: string;
    port: number;
}
class Server {
    static Build(configurator: (serverBuilder: ServerBuilder) => void): Server {
        const bldr = new ServerBuilder({ host: "localhost", port: 5050 });
        configurator(bldr);
        return bldr.Build();
    }
    constructor(endpoint: ServerEndpoint) {

    }
}
class EndpointBuilder {
    constructor(private host: string, private port: number) {

    }
    Host(host: string): EndpointBuilder {
        this.host = host;
        return this;
    }
    Port(port: number): EndpointBuilder {
        this.port = port;
        return this;
    }
    Build(): ServerEndpoint {
        return {
            host: this.host,
            port: this.port
        };
    }
}
class ServerBuilder {
    constructor(private endpoint: ServerEndpoint) {

    }
    ListenOn(configurator: (endpointBuilder: EndpointBuilder) => void): ServerBuilder {
        const endpoint: EndpointBuilder = new EndpointBuilder("localhost", 5050);
        configurator(endpoint);
        this.endpoint = endpoint.Build();
        return this;
    }
    Build(): Server {
        return new Server(this.endpoint);
    }
}
class FunctionalBuilderExample {
    static run() {
        const server = Server.Build(server => {
            server.ListenOn(endpoint => {
                endpoint.Host("0.0.0.0").Port(9009);
            })
        });
        console.log(server);
    }
}
export {FunctionalBuilderExample as Program};