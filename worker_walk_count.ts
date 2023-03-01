import fs from "fs"

export default async function walk_count(dir:string,level=0):Promise<number> {

	let n:number

	if( level == 0 )
		n = 1
	else
		n = 0

	const list = await fs.promises.readdir(dir)

	for ( const file of list ){

		const pathx = dir + "/" + file

		const stats = await fs.promises.stat(pathx)

		if ( stats.isDirectory() ){

			level++
			n += await walk_count(pathx,level);n++
			level--
		}
	
	}

	return n

}