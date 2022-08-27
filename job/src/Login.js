export const Login = () => {
    return (
        <div>
            <form>
                <label htmlFor='username' >Username</label>
                <input name='username'  type='text' />
                <label htmlFor='password'>Password</label>
                <input name='password' type='text'  />
                <button>SUBMIT</button>
            </form>
         
        </div>
    )
}