//server
import 'dotenv/config'
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import cookieParser from 'cookie-parser'
import session from 'express-session'

// express
const app=express()


// database configuration



// middlewares
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

// ejs configuration
app.set('view engine','ejs')
app.use(expressLayouts)
app.set('layout','layout/layout')

// routes
app.get('/',(req,res)=>{
    res.render('home')
}   
)


// start the server
app.listen(process.env.PORT||3000,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})