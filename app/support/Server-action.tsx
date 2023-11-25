"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function Send_Request(isUser: string, formData: FormData) {
  const resend = new Resend("re_CxiT6aDH_7f4qJVp6n3QjCkLgeLhvzAFn");
  const Email = formData.get("Email")?.toString();
  const Message = formData.get("Message")?.toString();
  resend.emails.send({
    from: `delivered@resend.dev`,
    to: "ugnw20@gmail.com",
    subject: `${isUser} has sent a message!`,
    html: `<p>${Message}</p> >> Contact: ${Email}`,
  });
}
