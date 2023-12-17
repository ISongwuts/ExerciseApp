import React from 'react'

function Footer() {
    return (
        <footer
            className=" w-[100%] text-center bottom-0 border-t">
            <div className=" text-PrimaryColors font-body font-bold text-xl xl:p-6 max-xl:p-4 max-lg:p-3 max-sm:p-2 text-neutral-700 dark:text-neutral-200">
                © 2023 Copyright:
                <a
                    className="text-neutral-800 dark:text-neutral-400"
                    href="https://tw-elements.com/"
                >Dev by ISO</a
                >
            </div>
        </footer>
    )
}

export default Footer