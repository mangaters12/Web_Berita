import { Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {
    console.log(meta);
const prev = meta.links[0].url;
const next  = meta.links[meta.links.length -1].url;
const current = meta.current_page;



    return (
        <div>
            <div className="btn-group">
            {prev && <Link href={prev} className="btn btn-outline">«</Link>}
                <Link className="btn btn-outline">{current}</Link>
                {next && <Link href={next} className="btn btn-outline">»</Link>}
            </div>
        </div>
    )
}

export default Paginator
