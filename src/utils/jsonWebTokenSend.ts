import JWT from "jsonwebtoken"

 const JWTToken = (payload: {id: string}) => {
    return JWT.sign(payload, process.env.NEXT_PUBLIC_SECRET_KEY!);
}

export default JWTToken