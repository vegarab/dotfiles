"Pathogen Options
execute pathogen#infect()
execute pathogen#helptags()
    
set nocompatible
filetype indent plugin on

set wildmenu
set showcmd
set ignorecase
set smartcase
set hlsearch
syntax on
set backspace=indent,eol,start
set ruler
set laststatus=2
set confirm
set visualbell
set t_vb=
set mouse=a
set cmdheight=1
set encoding=utf-8

colorscheme wal
let g:instant_markdown_autostart = 0

set number
set relativenumber

set notimeout ttimeout ttimeoutlen=200

set clipboard=unnamed
inoremap <C-v> <ESC>"+pa
vnoremap <C-c> "+y
inoremap <C-v> <ESC>"+pa
vnoremap <C-c> "+y

"""BASIC TOOLS
inoremap jw <Esc>
inoremap wj <Esc>
inoremap <C-l> <Space><Space>
"split navigation
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l
"split resizing
map <C-t> :vertical resize +5<Enter>
map <C-p> :vertical resize -5<Enter>
" buffer navigation
map <C-y> :bprevious<Enter>
map <C-o> :bnext<Enter>
"NERDTree Options
" Open NERDTree with CTRL-n
map <C-n> :NERDTreeToggle<CR>

" Gitgutter
let g:gitgutter_max_signs = 500 " default value

" Tabs and spaces
set autoindent
set shiftwidth=4
set tabstop=4
set noexpandtab
set textwidth=79

"SNIPPETS"
"inoremap <S-Space> <Esc>/<++><Enter>"_c4l
vnoremap <Space><Tab> <Esc>/<++><Enter>"_c4l
map <Space><Tab> <Esc>/<++><Enter>"_c4l
inoremap ;gui <++>

"""HTML
autocmd FileType javascript,html inoremap ;b  <b></b><Space><++><Esc>FbT>i
autocmd FileType javascript,html inoremap ;i  <em></em><Space><++><Esc>FeT>i
autocmd FileType javascript,html inoremap ;h1 <h1></h1><Space><++><Esc>2hF<i
autocmd FileType javascript,html inoremap ;h2 <h2></h2><Space><++><Esc>2hf<i
autocmd FileType javascript,html inoremap ;h3 <h3></h3><Space><++><Esc>2hf<i
autocmd FileType javascript,html inoremap ;h4 <h4></h4><Space><++><Esc>2hf<i
autocmd FileType javascript,html inoremap ;p <p></p><Space><++><Esc>02la
autocmd FileType javascript,html inoremap ;a <a<Space>href=""><++></a><Space><++><Esc>14hi
autocmd FileType javascript,html inoremap ;e <a<Space>target="_blank"<Space>href=""><++><\a><Space><++><Esc>14hi
autocmd FileType javascript,html inoremap ;ul <ul><Enter><li><++><\li><Enter><\ul><Enter><Enter><++><Esc>03kf<i
autocmd FileType javascript,html inoremap ;li <li></li><++><Esc>0lf>a
autocmd FileType javascript,html inoremap ;ol <ol><Enter><li><++><\li><Enter><\ol><Enter><++><Esc>03kf<i
"""END
 
" for html/css/javascript
autocmd Filetype html, setlocal ts=2 sw=2 expandtab
autocmd Filetype css, setlocal ts=2 sw=2 expandtab
"autocmd Filetype javascript, setlocal ts=2 sw=2 expandtab
autocmd Filetype xml, setlocal ts=2 sw=2 expandtab
autocmd Filetype tex,latex setlocal ts=2 sw=2 expandtab

let wiki_1 = {}
let wiki_1.syntax = 'markdown'
let wiki_1.ext = '.rmd'
let g:vimwiki_global_ext = 0
let g:vimwiki_list = [wiki_1]
let g:vimwiki_ext2syntax = {'.md': 'markdown', '.markdown': 'markdown', '.mdown': 'markdown', '.rmd': 'rmarkdown'}

map <F5> :!w<Enter>:!pdflatex <C-r>%<Enter>
map <F6> :setlocal spell! spelllang=en_uk<CR>
map <F7> :setlocal spell! spelllang=nb<CR>
let g:livepreview_previewer = 'mupdf'

set wildmode=longest,list,full
set wildmenu

"""LATEX
autocmd FileType tex inoremap <F5> <Esc>:!xelatex<spacE><c-r>%<Enter>i
autocmd FileType tex nnoremap <F5> :!xelatex<spacE><c-r>%<Enter>
autocmd FileType tex inoremap ;fr \begin{frame}<Enter>\frametitle{}<Enter><Enter><++><Enter><Enter>\end{frame}<Enter><Enter><++><Esc>6kf}i
autocmd FileType tex inoremap ;fit \begin{fitch}<Enter><Enter>\end{fitch}<Enter><Enter><++><Esc>3kA
autocmd FileType tex inoremap ;fig \begin{figure}<Enter><Enter>\end{figure}<Enter><Enter><++><Esc>3kA
autocmd FileType tex inoremap ;exe \begin{exe}<Enter>\ex<Space><Enter>\end{exe}<Enter><Enter><++><Esc>3kA
autocmd FileType tex inoremap ;em \emph{}<++><Esc>T{i
autocmd FileType tex inoremap ;bf \textbf{}<++><Esc>T{i
autocmd FileType tex vnoremap ; <ESC>`<i\{<ESC>`>2la}<ESC>?\\{<Enter>a
autocmd FileType tex vnoremap : <ESC>`<i{\<ESC>`>2la}<ESC>?{\\<Enter>la
autocmd FileType tex inoremap {{ <Esc>F{i
autocmd FileType tex inoremap }} <Esc>f}a
autocmd FileType tex inoremap ;it \textit{}<++><Esc>T{i
autocmd FileType tex inoremap ;ct \textcite{}<++><Esc>T{i
autocmd FileType tex inoremap ;cp \parencite{}<++><Esc>T{i
autocmd FileType tex inoremap ;glos {\gll<Space><++><Space>\\<Enter><++><Space>\\<Enter>\trans{``<++>''}}<Esc>2k2bcw
autocmd FileType tex inoremap ;x \begin{xlist}<Enter>\ex<Space><Enter>\end{xlist}<Esc>kA<Space>
autocmd FileType tex inoremap ;ol \begin{enumerate}<Enter><Enter>\end{enumerate}<Enter><Enter><++><Esc>3kA\item<Space>
autocmd FileType tex inoremap ;ul \begin{itemize}<Enter><Enter>\end{itemize}<Enter><Enter><++><Esc>3kA\item<Space>
autocmd FileType tex inoremap ;li <Enter>\item<Space>
autocmd FileType tex inoremap ;ref \ref{}<Space><++><Esc>T{i
autocmd FileType tex inoremap ;tab \begin{tabular}<Enter><++><Enter>\end{tabular}<Enter><Enter><++><Esc>4kA{}<Esc>i
autocmd FileType tex inoremap ;ot \begin{tableau}<Enter>\inp{<++>}<Tab>\const{<++>}<Tab><++><Enter><++><Enter>\end{tableau}<Enter><Enter><++><Esc>5kA{}<Esc>i
autocmd FileType tex inoremap ;can \cand{}<Tab><++><Esc>T{i
autocmd FileType tex inoremap ;con \const{}<Tab><++><Esc>T{i
autocmd FileType tex inoremap ;v \vio{}<Tab><++><Esc>T{i
autocmd FileType tex inoremap ;a \href{}{<++>}<Space><++><Esc>2T{i
autocmd FileType tex inoremap ;sc \textsc{}<Space><++><Esc>T{i
autocmd FileType tex inoremap ;chap \chapter{}<Enter><Enter><++><Esc>2kf}i
autocmd FileType tex inoremap ;sec \section{}<Enter><Enter><++><Esc>2kf}i
autocmd FileType tex inoremap ;ssec \subsection{}<Enter><Enter><++><Esc>2kf}i
autocmd FileType tex inoremap ;sssec \subsubsection{}<Enter><Enter><++><Esc>2kf}i
autocmd FileType tex inoremap ;st <Esc>F{i*<Esc>f}i
autocmd FileType tex inoremap ;beg \begin{DELRN}<Enter><++><Enter>\end{DELRN}<Enter><Enter><++><Esc>4k0fR:MultipleCursorsFind<Space>DELRN<Enter>c
"autocmd FileType tex inoremap ;up \usepackage{}<Esc>i
autocmd FileType tex inoremap ;up <Esc>/usepackage<Enter>o\usepackage{}<Esc>i
autocmd FileType tex nnoremap ;up /usepackage<Enter>o\usepackage{}<Esc>i
autocmd FileType tex inoremap ;tt \texttt{}<Space><++><Esc>T{i
autocmd FileType tex inoremap ;bt {\blindtext}
autocmd FileType tex inoremap ;nu $\varnothing$
autocmd FileType tex inoremap ;col \begin{columns}[T]<Enter>\begin{column}{.5\textwidth}<Enter><Enter>\end{column}<Enter>\begin{column}{.5\textwidth}<Enter><++><Enter>\end{column}<Enter>\end{columns}<Esc>5kA
autocmd FileType tex inoremap ;rn (\ref{})<++><Esc>F}i
"""END

autocmd FileType tex inoremap ;ent \gloss{}{<++>}{<++>}<Enter><++><Esc>k0f}i

"""Logical Symbols
autocmd FileType tex inoremap ;m $$<Space><++><Esc>2T$i
autocmd FileType tex inoremap ;M $$$$<Enter><Enter><++><Esc>2k$hi
autocmd FileType tex inoremap ;neg {\neg}
autocmd FileType tex inoremap ;V {\vee}
autocmd FileType tex inoremap ;or {\vee}
autocmd FileType tex inoremap ;L {\wedge}
autocmd FileType tex inoremap ;and {\wedge}
autocmd FileType tex inoremap ;ra {\rightarrow}
autocmd FileType tex inoremap ;la {\leftarrow}
autocmd FileType tex inoremap ;lra {\leftrightarrow}
autocmd FileType tex inoremap ;fa {\forall}
autocmd FileType tex inoremap ;ex {\exists}
autocmd FileType tex inoremap ;dia	{\Diamond}
autocmd FileType tex inoremap ;box	{\Box}
autocmd FileType tex inoremap ;gt	{\textgreater}
autocmd FileType tex inoremap ;lt	{\textless}
"""END

""".bib
autocmd FileType bib inoremap ;a @article{<Enter>author<Space>=<Space>"<++>",<Enter>year<Space>=<Space>"<++>",<Enter>title<Space>=<Space>"<++>",<Enter>journal<Space>=<Space>"<++>",<Enter>volume<Space>=<Space>"<++>",<Enter>pages<Space>=<Space>"<++>",<Enter>}<Enter><++><Esc>8kA,<Esc>i
autocmd FileType bib inoremap ;b @book{<Enter>author<Space>=<Space>"<++>",<Enter>year<Space>=<Space>"<++>",<Enter>title<Space>=<Space>"<++>",<Enter>publisher<Space>=<Space>"<++>",<Enter>}<Enter><++><Esc>6kA,<Esc>i
autocmd FileType bib inoremap ;c @incollection{<Enter>author<Space>=<Space>"<++>",<Enter>title<Space>=<Space>"<++>",<Enter>booktitle<Space>=<Space>"<++>",<Enter>editor<Space>=<Space>"<++>",<Enter>year<Space>=<Space>"<++>",<Enter>publisher<Space>=<Space>"<++>",<Enter>}<Enter><++><Esc>8kA,<Esc>i

"""IPA
autocmd FileType tex inoremap ;tipa \textipa{}<Space><++><Esc>T{i
autocmd FileType tex inoremap ;ae {\ae}
autocmd FileType tex inoremap ;A {\textscripta}
autocmd FileType tex inoremap ;dh {\dh}
autocmd FileType tex inoremap ;yogh {\textyogh}
autocmd FileType tex inoremap ;j {\textdyoghlig}
autocmd FileType tex inoremap ;uh {\textschwa}
autocmd FileType tex inoremap ;eps {\textepsilon}
autocmd FileType tex inoremap ;gam {\textgamma}
autocmd FileType tex inoremap ;I {\textsci}
autocmd FileType tex inoremap ;sh {\textesh}
autocmd FileType tex inoremap ;th {\texttheta}
autocmd FileType tex inoremap ;Th {\textthorn}
autocmd FileType tex inoremap ;TH {\textthorn}
autocmd FileType tex inoremap ;ups {\textupsilon}
autocmd FileType tex inoremap ;ph {\textphi}
autocmd FileType tex inoremap ;om {\textomega}
autocmd FileType tex inoremap ;sig {\textsigma}
autocmd FileType tex inoremap ;oe {\oe}
autocmd FileType tex inoremap ;ng {\ng}
autocmd FileType tex inoremap ;au {\textopeno}
autocmd FileType tex inoremap ;O {\textopeno}
autocmd FileType tex inoremap ;glot {\textglotstop}
autocmd FileType tex inoremap ;ch {\textteshlig}


"MARKDOWN
""".bib
autocmd FileType bib inoremap ;a @article{<Enter>author<Space>=<Space>"<++>",<Enter>year<Space>=<Space>"<++>",<Enter>title<Space>=<Space>"<++>",<Enter>journal<Space>=<Space>"<++>",<Enter>volume<Space>=<Space>"<++>",<Enter>pages<Space>=<Space>"<++>",<Enter>}<Enter><++><Esc>8kA,<Esc>i
autocmd FileType bib inoremap ;b @book{<Enter>author<Space>=<Space>"<++>",<Enter>year<Space>=<Space>"<++>",<Enter>title<Space>=<Space>"<++>",<Enter>publisher<Space>=<Space>"<++>",<Enter>}<Enter><++><Esc>6kA,<Esc>i
autocmd FileType bib inoremap ;c @incollection{<Enter>author<Space>=<Space>"<++>",<Enter>title<Space>=<Space>"<++>",<Enter>booktitle<Space>=<Space>"<++>",<Enter>editor<Space>=<Space>"<++>",<Enter>year<Space>=<Space>"<++>",<Enter>publisher<Space>=<Space>"<++>",<Enter>}<Enter><++><Esc>8kA,<Esc>i
autocmd Filetype markdown,rmd inoremap ;n ---<Enter><Enter>
autocmd Filetype markdown,rmd inoremap ;b ****<++><Esc>F*hi
autocmd Filetype markdown,rmd inoremap ;s ~~~~<++><Esc>F~hi
autocmd Filetype markdown,rmd inoremap ;e **<++><Esc>F*i
autocmd Filetype markdown,rmd inoremap ;h ====<Space><++><Esc>F=hi
autocmd Filetype markdown,rmd inoremap ;i ![](<++>)<++><Esc>F[a
autocmd Filetype markdown,rmd inoremap ;a [](<++>)<++><Esc>F[a
autocmd Filetype markdown,rmd inoremap ;1 #<Space><Enter><++><Esc>kA
autocmd Filetype markdown,rmd inoremap ;2 ##<Space><Enter><++><Esc>kA
autocmd Filetype markdown,rmd inoremap ;3 ###<Space><Enter><++><Esc>kA
autocmd Filetype markdown,rmd inoremap ;l --------<Enter>
autocmd Filetype markdown map <F5> :!pandoc<space><C-r>%<space>-o<space><C-r>%.pdf<Enter><Enter>
autocmd Filetype rmd map <F5> :!echo<space>"require(rmarkdown);<space>render('<c-r>%')"<space>\|<space>R<space>--vanilla<enter>
autocmd Filetype rmd inoremap ;r ```{r,<space>echo=TRUE}<CR>```<CR><CR><esc>2kO
