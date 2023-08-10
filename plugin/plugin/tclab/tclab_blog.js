(() => {
  const config = {
    // 快捷键
    HOTKEY: (ev) => metaKeyPressed(ev) && ev.key === "g",
  };
  (() => {
    const modal_css = `
        #typora-blog-commander {
            position: fixed;
            top: 42px;
            right: 15px;
            width: 600px;
            z-index: 9999;
            padding: 4px;
            background-color: #f8f8f8;
            box-shadow: 0 4px 10px rgba(0, 0, 0, .5);
            border: 1px solid #ddd;
            border-top: none;
            color: var(--text-color);
            transform: translate3d(0, 0, 0)
        }
        
        .mac-seamless-mode #typora-blog-commander {
            top: 30px
        }
        
        #typora-blog-commander-form {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 25px;
        }
        
        #typora-blog-commander-form select, input {
            border: 1px solid #ddd;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            border-radius: 2px;
            height: 27px;
            margin-top: 1px;
            margin-bottom: 1px;
        }
                
        #typora-blog-commander-form input {
            width: 60%;
            margin-left: 0;
            margin-right: 2.5px;
            padding-left: 5px;
            padding-right: 24px;
        }

        #typora-blog-commander-form select {
            width: 20%;
            margin-left: 2.5px;
            margin-right: 0;
            padding: 1px 2px;
        }
        
        #typora-blog-commander-form .typora-blog-commander-commit {
            position: absolute;
            padding: 1px;
            left: 335px;
            opacity: 0.7;
            cursor: pointer;
            // display: none;
        }

        .typora-blog-commander-output {
            margin-top: 0;
            cursor: default;
            max-height: 340px;
            overflow-y: auto;
            overflow-x: auto;
            display:none;
        }
        
        .typora-blog-commander-output pre {
            display: inline-block;
            font-size: 13px;
            line-height: 1.1;
            margin: 10px 10px 5px 5px;
        }
        
        .typora-blog-commander-output pre.error {
            color: red;
        }

        #typora-blog-commander-form input:focus, pre:focus {
            outline: 0
        }
        `;
    const style = document.createElement("style");
    style.id = "plugin-commander-style";
    style.type = "text/css";
    style.innerHTML = modal_css;
    document.getElementsByTagName("head")[0].appendChild(style);

    const windowOption = `
            <option value="Create">Create</option>
            <option value="Delete">Delete</option>
            <option value="Modify">Modify</option>
        `;

    const div = `
        <div id="typora-blog-commander-form">
            
            <select class="typora-blog-commander-shell">${windowOption}</select>
            <input type="text" class="input" placeholder="Enter Your Tags" autocorrect="off" spellcheck="false"
                autocapitalize="off" data-lg="Front" title="Tclab Blog Commander - 输入标签\n使用空格隔开.">
            <i class="ion-ios7-play typora-blog-commander-commit" ty-hint="执行命令"></i>
            </div>
        <div class="typora-blog-commander-output"><pre tabindex="0"></pre></div>
       `;

    const main = document.createElement("div");
    main.id = "typora-blog-commander";
    main.style.display = "none";
    main.innerHTML = div;
    const searchPanel = document.getElementById("md-searchpanel");
    searchPanel.parentNode.insertBefore(main, searchPanel.nextSibling);
  })();

  const modal = {
    modal: document.getElementById("typora-blog-commander"),
    input: document.querySelector("#typora-blog-commander-form input"),
    shellSelect: document.querySelector(
      "#typora-blog-commander-form .typora-blog-commander-shell"
    ),
    builtinSelect: document.querySelector(
      "#typora-blog-commander-form .typora-blog-commander-builtin"
    ),
    commit: document.querySelector(
      "#typora-blog-commander-form .typora-blog-commander-commit"
    ),
    output: document.querySelector(".typora-blog-commander-output"),
    pre: document.querySelector(".typora-blog-commander-output pre"),
  };

  const hide = () => {
    modal.modal.style.display = "none";
  };

  const call = () => {
    if (modal.modal.style.display === "block") {
      modal.modal.style.display = "none";
    } else {
      modal.modal.style.display = "block";
      modal.input.select();
    }
  };

  module.exports = { call, config, hide };

  console.log("tclab_blog.js had been injected");
})();
