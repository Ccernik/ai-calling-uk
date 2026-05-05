import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, company, email, website, requirements, agreeTerms } = body

    // Validate required fields
    if (!fullName || !email || !agreeTerms) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    )

    // Insert into "ai recepton" table
    const { data, error } = await supabase
      .from("ai recepton")
      .insert([
        {
          full_name: fullName,
          company_name: company,
          work_email: email,
          business_website: website,
          specific_requirements: requirements,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save demo request" },
        { status: 500 }
      )
    }

    console.log("Demo request saved to Supabase:", data)

    return NextResponse.json(
      { message: "Demo request submitted successfully", data },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing demo request:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
