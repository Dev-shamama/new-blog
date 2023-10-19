import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const data = [
        {
            "_id": "63f4ccacd69091403da9171d",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#3A98B9",
            "__v": 0
        },
        {
            "_id": "63f4ccc4d69091403da91721",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#FFF1DC",
            "__v": 0
        },
        {
            "_id": "63f4cd09def30b9484fb8e3d",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#E8D5C4",
            "__v": 0
        },
        {
            "_id": "63f4cd2702f3722e36974796",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#EEEEEE",
            "__v": 0
        },
        {
            "_id": "63f4cd4e6e50f5a8a2b45ec5",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#13005A",
            "__v": 0
        },
        {
            "_id": "63f4cd7e62f39b150819004e",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#03C988",
            "__v": 0
        },
        {
            "_id": "63f4cd8ec6a5fbee51e08db5",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#1C82AD",
            "__v": 0
        },
        {
            "_id": "63f4cdbb96bec3602f854871",
            "user": "63f4cc69d69091403da91715",
            "color_name": "#1D1CE5",
            "__v": 0
        },
    ]

    return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
    const req = await request.json();
    console.log(req);
    return NextResponse.json({ success: true })
}
