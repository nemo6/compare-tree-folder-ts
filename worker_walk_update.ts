import fs from "fs"
// import path from "path"

interface count_obj{
E:number
F:number
MAX_F:number
MAX_E:number
}

interface Input {
pathx: string
size: number
type: string
red: boolean
opacity: number
source: string
level:number
}
	
let count_obj:count_obj = { "F":0,"E":0,"MAX_F":1323,"MAX_E":969 }

export default async (dir:string) => {

	let {m} = (await walk_csv_async(dir,dir))
	// m = m.filter(x=>x.type=="folder")

	const p = dir

	for( const k in m ) {
		m[k].source = dir
		m[k].pathx  = m[k].pathx.replace( p + "/" , "" )
		m[k].level  = m[k].pathx.match(/\//g)?.length ?? 0
	}

	return m
}

async function walk_csv_async(dir:string,parentDir:string,table:Input[]=[],level=0) {

	// count_obj[ parentDir[0] as keyof count_obj ]++

	// let a = percentage( count_obj[ "E" ] , count_obj["MAX_E"] )
	// let b = percentage( count_obj[ "F" ] , count_obj["MAX_F"] )
	
	// console.log(`${a}%    ${b}%`)

	// console.log(`${count_obj[ "E" ]}/${count_obj["MAX_E"]}    ${count_obj[ "F" ]}/${count_obj["MAX_F"]}`);

	let sum_size = 0

	const list = await fs.promises.readdir(dir)

	for ( const file of list ){

		const pathx = dir + "/" + file

		const stats = await fs.promises.stat(pathx)

		if( stats.isFile() ){

			table.push( { "pathx": pathx, "size" : stats.size, "type": "file", "red":false, "opacity":1, source:"", level:0 } )
			
			sum_size += stats.size

		}

		else if ( stats.isDirectory() ){
			level++
			const {n} = ( await walk_csv_async(pathx,parentDir,table,level) )
			sum_size += n
			level--
		}
	
	}

	if( level != 0 ) table.push( { "pathx":dir, "size" : sum_size, "type":"folder", "red":false, "opacity":1, source:"", level:0 } )

	return { m:table, n:sum_size }

}

/* function percentage( partialValue:number, totalValue:number ) {
	return Math.ceil((100 * partialValue) / totalValue)
} */