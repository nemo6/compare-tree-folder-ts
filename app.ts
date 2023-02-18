import foo2 from        "./worker/worker"
import walk_count from  "./worker/worker_walk_count"
import walk_update from "./worker/worker_walk_update"

import _ from "lodash"
import express, { Express, Request, Response } from "express"

import fs from "fs"

const port = 8080

let VA = "E:/HDD"
let VB = "F:/HDD"

let style = `<link rel="stylesheet" type="text/css" href="style.css">

<script>

	function foo(e){

		console.log(e)
		console.log(e.title)
		
		for( let x of document.querySelectorAll(\`button[title="\${e.title}"\`) ){
			x.parentElement.parentElement.lastChild.classList.toggle("hide")
		}
		
	}

</script>`

;( async () => {

	let [FA,FB] = [
	JSON.parse(fs.readFileSync("E_HDD.json","utf8")),
	JSON.parse(fs.readFileSync("F_HDD.json","utf8"))
	]

	FA = FA.filter( (x: { pathx: string }) => (/SAVES/).test(x.pathx) )
	FA = FA.filter( (x: { type: string }) => x.type == "folder" )

	let [a,b,c] = foo2(FA,FB)

	const app: Express = express()

	app.use(express.static( __dirname + "/.." )) // jump one folder above

	app.get("/", async (req: Request, res: Response) => {

		res.send(`${style}<div style="display:flex;">

		<pre>${JSON.stringify(a,null,2)}</pre>

		<pre>${JSON.stringify(b,null,2)}</pre>

		<div>${c}</div>

		</div>`)

	})

	app.listen(port, () => {
	console.log(`Running at port ${port}`);
	})

})()
