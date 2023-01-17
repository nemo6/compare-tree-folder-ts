/*module.exports = ({ a, b }) => {
  return a + b;
};*/

import _ from "lodash"

interface Input {
pathx: string
size: number
type: string
red: boolean
source: string
opacity: number
level:number
}

interface index {
[key: string]: {}
}
	
export default (FA:Input[],FB:Input[]) => { // Input[]

	function is_included(a: Input[], b: Input[]) {

		for (const k in a) {

			if (!_.map(b, "pathx").includes(a[k].pathx))
			a[k].red = true
			/* else
			a[k].red = false */
		}

		return a
	}

	function foo(m:Input[][]) {

		const [a,b] = m

		const ma = [...a]
		const mb = [...b]

		const argv = [[a, ma], [b, mb]]

		function bar(h: number, j: number) {

			for (const k in argv[h][1]) {

				if (!_.map(argv[j][1], "pathx").includes(argv[h][1][k].pathx)) {

					const copy = _.clone(argv[h][0][k])
					copy.opacity = 0.5
					argv[j][0].push(copy)

				}

			}

		}

		;( (...x) => { bar(...x); _.flip(bar)(...x) } ) (0,1)

		return [a,b]

	}

	function mapIn(x: Input[][]) {
		return [is_included(x[0],x[1]), _.flip(is_included)(x[0],x[1])]
	}

	function sortP(x: Input[]) {
		return _.sortBy(x, "pathx")
	}

	// _.mixin({mapIn,foo,sortP})

	/* return _([FA,FB])
	.thru( x => mapIn(x) )
	.thru( x => foo(x) )
	.map( sortP )
	.map( x => jsontree( csvToJson(x) ) )
	.thru( x => render(x[0],x[1]) )
	.valueOf() */

	let a = csvToJson(FA)
	let b = jsonToChildren({ obj1: a }) as NestedObject[]
	let c = jsontree(b)
	return [a,b,c]
}

/*
(obj2 as Record<typeof k, typeof k>)
obj = obj as unknown as { prop: string };
var obj: {[k: string]: any} = {};

const someObj:ObjectType = data;
const field = 'username';

const temp = someObj[field];
const temp = someObj[field as keyof ObjectType]
const temp = someObj[field as keyof typeof someObj] */

interface NestedObject {
"@pathx"?:string
"@size"?:number
"@type"?:string
"@red"?:boolean
"@opacity"?:number
"@source"?:string
"@level"?:number
children?: NestedObject[]
}
		
function jsontree(nested_obj:NestedObject[],obj={"str":""},i=0,table:Array<string>=[]){
	
	let current_level = 0

	const totalValues = (nestedObjects: NestedObject[]) => {
	return nestedObjects.reduce(
		(str, nested_obj: NestedObject,i): string => {
		
		console.log(i)
		
		if ( nested_obj["@type"] == "file" ){
			obj.str += `<li title="" class="" id="child" onclick=""><span>size : ${nested_obj["@size"]} | ${formatBytes(nested_obj["@size"] as number)}</span></li>`
		}
		else if ( nested_obj["@type"] == "folder" ){
			const size_folder = ( x => x ?? "" )(nested_obj["@size"])
			obj.str += `<li class="" id="parent"> <span style="opacity:${nested_obj["@opacity"]}"> <button onclick="foo(this)" title="" class="style_button" >${nested_obj["@pathx"]}</button> <span class="label">${numberWithSpaces(size_folder as number)}</span> <span class="label">${formatBytes(size_folder as number)}</span> </span><ul>`
		}

		if (nested_obj.children) {
		totalValues(nested_obj.children)
		}

		obj.str += `</ul></li>`

		return str
		},
		"",
	);
	};

	totalValues(nested_obj)

	return obj.str

	/* console.log(nested_obj["@red"])

	if ( nested_obj["@type"] == "file" ){

		obj.str += `<li title="" class="" id="child" onclick=""><span>size : ${nested_obj["@size"]} | ${formatBytes(nested_obj["@size"] as number)}</span></li>`
	
	} else if ( nested_obj["@type"] == "folder" ){

		const size_folder = ( x => x ?? "" )(nested_obj["@size"])

		obj.str += `<li class="" id="parent"> <span style="opacity:${nested_obj["@opacity"]}"> <button onclick="foo(this)" title="" class="style_button" >${nested_obj["@pathx"]}</button> <span class="label">${numberWithSpaces(size_folder as number)}</span> <span class="label">${formatBytes(size_folder as number)}</span> </span> <ul>`

		jsontree(nested_obj.children,obj,i,table)

		obj.str += `</ul></li>`

	}
	return obj.str */

}

function csvToJson(m:Input[]){

	const obj:index = {}

	for( const x of m ){

		[...x.pathx.split("/")].reduce( (o,v,i,arr) => {

			if( o[v] === undefined ){

				o[v] = {}

			}

			if( x.type === "file" && i === arr.length-1 ){

				o[v] = x.size

			}

			if( x.type === "folder" && i === arr.length-1 ){

				let w = ( (x) => { let w:index={};for( let k in x ){
				w["@"+k]=x[k as keyof Input]};return w
				})(x)

				;( (o,w) => { let m=Object.keys(w)
				for( let k of Object.keys(o) )
					if( m.includes(k) )
						console.log("ERROR",k)
				})(o[v],w)

				Object.assign(o[v],{ ...w })


			}	

			return o[v]

		}, obj )
		
	}

	return obj
}

function jsonToChildren({ obj1, obj2 = {} }: { obj1: index; obj2?: NestedObject }){

	for( let [key,value] of Object.entries(obj1) ){
		if( (/@/).test(key) )
		Object.assign(obj2,{[key]:value})
	}

	for( let [n,k] of Object.keys(obj1).entries() ){

		if( !(/@/).test(k) && k != "children" ){

			if( obj2.children == undefined ){
			obj2.children = []
			}

			obj2.children.push({})
			
			jsonToChildren({ obj1: obj1[k], obj2: obj2.children[n] })
		}

	}

	return obj2.children ?? {}

}

function numberWithSpaces(x:number):string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")
}

function formatBytes( bytes:number, decimals = 3):string {
  if (bytes === 0) return "0 octets"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["octets", "ko", "mo", "go", "to", "po", "eo", "zo", "yo"];
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const float = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  return Math.trunc(float) + " " + sizes[i]
}

function render(a:string,b:string):string { return `
<div style="display:flex;">
	
	<div style="white-space:pre;">${a}</div>

	<div style="white-space:pre;">${b}</div>
	
</div>` }
