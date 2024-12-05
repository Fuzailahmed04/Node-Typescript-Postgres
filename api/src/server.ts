
import Fastify from 'fastify'
import userRoutes from './routes/userRoutes';


const fastify = Fastify({
  logger: true
});


fastify.register(userRoutes);

fastify.get('/testing', async ( request: any, reply: any) =>{
  return{ message : 'Hello Mr Fuzail'};
}
);

fastify.listen({ port: 4001, host: '0.0.0.0' }), (err: any,address: any) =>{
  if(err){
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is runnning at the ${ address}`);
};