export default function (context){
   if(context.store.state.auth.isAuthenticated){
      return context.redirect('/exhibition');
    }
}