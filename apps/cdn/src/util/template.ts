import env from "@util/env";

export function getCommentHTML(post: any) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Remark OG</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url("https://rsms.me/inter/inter.css");

          * {
            font-family: "Inter", sans-serif;
          }

          @supports (font-variation-settings: normal) {
            * {
              font-family: "Inter var", sans-serif;
            }
          }

          .btn-icon {
            height: 1.75rem;
            width: 1.75rem;
            cursor: pointer;
            border-radius: 0.375rem;
            background-color: rgb(0 0 0 / var(--tw-bg-opacity));
            --tw-bg-opacity: 0;
            padding: 0.25rem;
            --tw-text-opacity: 1;
            color: rgb(55 65 81 / var(--tw-text-opacity));
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 0.15s;
          }
        </style>
      </head>
      <body class="flex h-screen w-screen items-center justify-center bg-black">
        <div
          class="flex h-full w-full items-center justify-center bg-gray-50"
        >
          <div
            class="flex w-[23rem] scale-[250%] flex-col items-center justify-center overflow-hidden rounded-[0.75rem] bg-white shadow-md"
          >
            <div class="flex w-full flex-row items-start justify-center gap-3 p-4">
              <div class="relative mt-1 min-h-[2.5rem] min-w-[2.5rem]">
                <img
                  src="${
                    env("NODE_ENV") == "development"
                      ? "http://localhost:5000"
                      : "https://cdn.remark.surf"
                  }/avatar/light/200x200/${post.author.id}"
                  class="absolute top-0 left-0 z-[2] h-[2.5rem] w-[2.5rem] rounded-full"
                />
              </div>
              <div class="flex w-full flex-col items-start">
                <div class="flex w-full flex-row justify-between">
                  <label class="text-md font-semibold text-black"
                    >${post.author.username}</label
                  ><small class="text-xs text-gray-500">${new Date(
                    post.createdAt
                  ).toLocaleDateString([], { dateStyle: "short" })}</small>
                </div>
                <p class="text-sm text-gray-800">
                  <span>${post.comment}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`;
}
