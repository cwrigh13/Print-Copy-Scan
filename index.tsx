// --- STATE MANAGEMENT ---
const userSelections: {
    service: string | null;
    pages: number | string;
    size: string | null;
    color: string | null;
    hasCard: string | null;
    hasCredit: string | null;
    printSource: string | null;
    hasUSB: string | null;
} = {
    service: null,
    pages: 1,
    size: null,
    color: null,
    hasCard: null,
    hasCredit: null,
    printSource: null,
    hasUSB: null,
};

let stepHistory: string[] = [];

// --- DOM ELEMENT REFERENCES ---
const steps = document.querySelectorAll('.step');
const progressBarContainer = document.querySelector('.progress-bar-container') as HTMLElement;
const progressBar = document.getElementById('progress-bar') as HTMLElement;
const appContainer = document.querySelector('.app-container') as HTMLElement;
const unsurePagesBtn = document.getElementById('unsure-pages') as HTMLElement;
const priceModal = document.getElementById('price-modal') as HTMLElement;
const priceHelpIcon = document.getElementById('price-help-icon') as HTMLElement;
const modalCloseBtn = document.getElementById('modal-close-btn') as HTMLElement;
const finalTitleEl = document.getElementById('final-title') as HTMLElement;
const finalMessageEl = document.getElementById('final-message') as HTMLElement;
const navContainer = document.querySelector('.navigation-buttons') as HTMLElement;
const backBtn = document.getElementById('back-btn') as HTMLElement;
const restartBtn = document.getElementById('restart-btn') as HTMLElement;
const skipBtn = document.getElementById('skip-btn') as HTMLElement;
const costConfirmationTitleEl = document.getElementById('cost-confirmation-title') as HTMLElement;
const costDisplayEl = document.getElementById('cost-display') as HTMLElement;
const pagesTitleEl = document.getElementById('pages-title') as HTMLElement;
const scanPriceModal = document.getElementById('scan-price-modal') as HTMLElement;
const scanHelpIcon = document.getElementById('scan-help-icon') as HTMLElement;
const scanModalCloseBtn = document.getElementById('scan-modal-close-btn') as HTMLElement;
const pageCountInput = document.getElementById('page-count') as HTMLInputElement;
const minusBtn = document.getElementById('minus-btn') as HTMLElement;
const plusBtn = document.getElementById('plus-btn') as HTMLElement;
const langButtons = document.querySelectorAll('.lang-btn');


// --- TRANSLATION LOGIC ---
const translations = {
    'en': {
        main_title: 'Print, Copy, Scan',
        select_language: 'Select your language',
        what_to_do: 'What would you like to do today?',
        printing: 'Printing',
        photocopying: 'Photocopying',
        scanning: 'Scanning',
        has_usb: 'Do you have a USB drive?',
        no_usb_title: 'Our printers can only scan to USB, not to your email address.',
        no_usb_body: 'See a staff member to purchase a USB drive.',
        how_many_pages: 'How many pages?',
        how_many_pages_print: 'How many pages would you like to print?',
        how_many_pages_scan: 'How many pages do you need to scan?',
        next: 'Next',
        not_sure: "I'm not sure",
        paper_size: 'What size paper do you require?',
        color_choice: 'Which colour do you require?',
        color: 'Colour',
        bw: 'Black & White',
        cost_title_print: 'Your printing will cost:',
        cost_title_copy: 'Your photocopying will cost:',
        cost_title_scan: 'Your scan will cost:',
        has_card: 'Do you have a library card?',
        yes: 'Yes',
        no: 'No',
        has_credit: 'Do you have enough credit?',
        add_value_title: 'Adding money to your library card',
        add_value_body: '<ol><li>Select <strong>Add Value</strong> at the Printing Kiosk</li><li>Scan your library card and enter your password</li><li>Select <strong>Next</strong></li><li>You can then add money either by <strong>EFTPOS</strong> or with <strong>cash</strong> (follow the instructions on the kiosk screen)</li></ol>',
        check_balance_title: 'How to check your balance',
        check_balance_body: '',
        print_source: 'Where are you printing from?',
        library_pc: 'Library PC',
        quick_print_pc: 'Quick Print PC',
        usb_drive: 'USB Drive',
        personal_device: 'Personal Device (ie phone, laptop)',
        instructions: 'Instructions',
        instructions_scanning: 'Instructions for scanning',
        back: 'Back',
        restart: 'Restart',
        skip: 'Skip',
        price_list: 'Price List',
        price_a4_bw: 'A4 Black & White Print/Copy',
        price_a3_bw: 'A3 Black & White Print/Copy',
        price_a4_color: 'A4 Colour Print/Copy',
        price_a3_color: 'A3 Colour Print/Copy',
        scan_prices: 'Scanning Prices',
        scan_a4: 'A4 Scan (per page)',
        scan_a3: 'A3 Scan (per page)',
        final_guest_ticket_title: "Purchase a guest ticket",
        final_guest_ticket_body: "<ol><li>Select <strong>Print, Copy and Scanning Ticket</strong> at the Printing Kiosk</li><li>You can then add money either by <strong>EFTPOS</strong> or with <strong>cash</strong> (follow the instructions on the kiosk screen)</li><li>If paying by cash, a <strong>Guest Ticket</strong> will automatically be printed out. If paying by EFTPOS, you will need to select <strong>Yes</strong> for the Guest Ticket to be printed out. You will need to use this ticket when printing, copying, and scanning.</li></ol>",
        final_no_credit_body: "Your account does not have enough credit. Please visit the service desk to top up your card.",
        final_photocopying_ok: '<ol><li>Sign in to any library printer.<ol type="a"><li>Scan your <strong>library card</strong> or <strong>guest ticket barcode</strong>.</li><li>If you are using your library card, enter your password (tap the <strong>password field</strong>, tap the <strong>keyboard icon</strong>, enter your <strong>password</strong>, and tap <strong>OK</strong> twice).</li></ol></li><li>Choose <strong>Use Copier</strong> and <strong>Copy</strong></li><li>Place your document face down on the glass</li><li>Use the printer screen to adjust the scan settings</li><li>Press the <strong>Start button</strong> to scan the first page</li><li>For more pages, place the next item on the glass, and press the <strong>Start button</strong> again. Repeat for all pages.</li><li>After the last page is scanned, press <strong>Finish</strong> on the screen and press the <strong>Start button</strong> again to release your printing</li><li>To log out, press the <strong>Access button</strong> on the printer, and <strong>Log Out</strong> on the screen.</li></ol>',
        final_scanning_ok: "<ol><li>Sign in to the printer:<ol><li>Scan your library card or guest ticket barcode</li><li>If you are using your library card, enter your password (tap the <strong>password field</strong>, tap the <strong>keyboard icon</strong>, type your <strong>password</strong>, and tap <strong>OK</strong> twice)</li></ol></li><li>Choose <strong>Use Copier</strong></li><li><strong>Insert your USB</strong> into the port on the right side of the printer. Wait a few seconds.</li><li>Select <strong>Save a document to external memory</strong> (If this option doesn't appear, tap the USB icon in the top-right of the screen)</li><li>Place your document face down on the <strong>glass</strong>, or face up in the <strong>top feeder</strong></li><li>Change any <strong>settings</strong> on the screen</li><li>Press the <strong>Start button</strong><ol><li>If using the glass, to scan another page to the same file, place the next page on the glass, press <strong>Start</strong>, and repeat until all pages are scanned</li></ol></li><li>After the last page, press <strong>Finish</strong>, and press the <strong>Start button</strong> again to save the file to your USB</li><li>Press the Access button on the printer and select <strong>Log out</strong> at the top-right of the screen</li><li>Take your <strong>USB</strong> and <strong>original documents</strong> with you</li></ol>",
        final_printing_pc: "<ol><li>Save or download the documents that you want to print</li><li>Click <strong>Managed Bookmarks</strong> in the top-left corner of the web browser. Select <strong>Print Files</strong>.</li><li>Select either <strong>Library Card Number/Password</strong> or <strong>Guest Ticket Number</strong>.</li><li>Enter your library card number and password, or enter your guest ticket number, <strong>Continue</strong>, and use password “<strong>GUEST</strong>”. Click <strong>Log In</strong>.</li><li>Click <strong>Select Files</strong>, go to the folder where they are saved, select the file/s, and click <strong>Open</strong>.</li><li>To change the settings print settings, click the document once, and click <strong>Change Job Attributes</strong>.</li><li>When your files are ready to print, the <strong>Status</strong> column will say “<strong>Waiting for release</strong>”. Check the total printing costs and your balance. Add more money if needed.</li><li>Sign in to any library printer. If you are using your library card, enter your password (tap the <strong>password field</strong>, tap the <strong>keyboard icon</strong>, enter your password, and tap <strong>OK</strong> twice).</li><li>Select <strong>My Print Jobs</strong>.</li><li>Select the jobs that you would like to print.</li><li>Select <strong>Print</strong>.</li><li><strong>Log Out</strong> when you are finished.</li></ol>",
        final_printing_usb: "<ol><li>Sign in to the printer:<ol><li>Scan your library card or guest ticket barcode</li><li>If you are using your library card, enter your password (tap the <strong>password field</strong>, tap the <strong>keyboard icon</strong>, type your <strong>password</strong>, and tap <strong>OK</strong> twice)</li></ol></li><li>Choose <strong>Use Copier</strong></li><li><strong>Insert your USB</strong> into the port on the right side of the printer. Wait a few seconds.</li><li>Select <strong>Print a document from external memory</strong> (If this option doesn't appear, tap the <strong>USB</strong> icon in the top-right corner of the screen)</li><li>Select the files that you want to print</li><li>Select <strong>Print</strong> and <strong>OK</strong></li><li>Adjust any print settings</li><li>Press the <strong>Start button</strong> to print</li><li>To log out, press the <strong>Access button</strong> on the printer, and <strong>Log Out</strong> on the screen</li><li>Remember to take your USB</li></ol>",
        final_printing_device: "Please use the 'Quick Print' service to email your document to the print queue, then release it from any printer.",
        final_printing_unknown: "You have enough credit. Please proceed to a library printer to complete your printing job.",
    },
    'zh-CN': {
        main_title: '打印、复印、扫描',
        select_language: '选择您的语言',
        what_to_do: '您今天想做什么？',
        printing: '打印',
        photocopying: '复印',
        scanning: '扫描',
        has_usb: '您有USB驱动器吗？',
        no_usb_title: '我们的打印机只能扫描到USB，不能扫描到您的电子邮件地址。',
        no_usb_body: '请咨询工作人员购买USB驱动器。',
        how_many_pages: '多少页？',
        how_many_pages_print: '您想打印多少页？',
        how_many_pages_scan: '您需要扫描多少页？',
        next: '下一步',
        not_sure: '我不确定',
        paper_size: '您需要什么尺寸的纸张？',
        color_choice: '您需要哪种颜色？',
        color: '彩色',
        bw: '黑白',
        cost_title_print: '您的打印费用为：',
        cost_title_copy: '您的复印费用为：',
        cost_title_scan: '您的扫描费用为：',
        has_card: '您有图书卡吗？',
        yes: '是',
        no: '否',
        has_credit: '您的信用额度足够吗？',
        add_value_title: '为您的图书卡充值',
        add_value_body: '<ol><li>在打印亭选择<strong>充值</strong></li><li>扫描您的图书卡并输入密码</li><li>选择<strong>下一步</strong></li><li>您可以通过<strong>EFTPOS</strong>或<strong>现金</strong>充值（按照亭屏幕上的说明操作）</li></ol>',
        check_balance_title: '如何查询余额',
        check_balance_body: '',
        print_source: '您从哪里打印？',
        library_pc: '图书馆电脑',
        quick_print_pc: '快速打印电脑',
        usb_drive: 'USB驱动器',
        personal_device: '个人设备（如手机、笔记本电脑）',
        instructions: '说明',
        instructions_scanning: '扫描说明',
        back: '返回',
        restart: '重新开始',
        skip: '跳过',
        price_list: '价格表',
        price_a4_bw: 'A4黑白打印/复印',
        price_a3_bw: 'A3黑白打印/复印',
        price_a4_color: 'A4彩色打印/复印',
        price_a3_color: 'A3彩色打印/复印',
        scan_prices: '扫描价格',
        scan_a4: 'A4扫描（每页）',
        scan_a3: 'A3扫描（每页）',
        final_guest_ticket_title: "购买访客票",
        final_guest_ticket_body: "<ol><li>在打印亭选择<strong>打印、复印和扫描票</strong></li><li>您可以通过<strong>EFTPOS</strong>或<strong>现金</strong>充值（按照亭屏幕上的说明操作）</li><li>如果用现金支付，将自动打印出<strong>访客票</strong>。如果用EFTPOS支付，您需要选择<strong>是</strong>打印出访客票。您在打印、复印和扫描时需要使用此票。</li></ol>",
        final_no_credit_body: "您的账户余额不足。请到服务台为您的卡充值。",
        final_photocopying_ok: '<ol><li>登录任何一台图书馆打印机。<ol type="a"><li>扫描您的<strong>图书卡</strong>或<strong>访客票条形码</strong>。</li><li>如果您使用的是图书卡，请输入您的密码（轻点<strong>密码字段</strong>，轻点<strong>键盘图标</strong>，输入您的<strong>密码</strong>，然后轻点两次<strong>确定</strong>）。</li></ol></li><li>选择<strong>使用复印机</strong>和<strong>复印</strong></li><li>将您的文档正面朝下放在玻璃板上</li><li>使用打印机屏幕调整扫描设置</li><li>按<strong>开始按钮</strong>扫描第一页</li><li>若要复印更多页面，请将下一个文档放在玻璃板上，然后再次按<strong>开始按钮</strong>。对所有页面重复此操作。</li><li>扫描完最后一页后，在屏幕上按<strong>完成</strong>，然后再次按<strong>开始按钮</strong>以释放您的打印作业</li><li>要注销，请按打印机上的<strong>访问按钮</strong>，然后在屏幕上按<strong>注销</strong>。</li></ol>',
        final_scanning_ok: "<ol><li>登入打印机：<ol><li>扫描您的图书卡或访客票条形码</li><li>如果您使用图书卡，请输入密码（点击<strong>密码字段</strong>，点击<strong>键盘图标</strong>，输入<strong>密码</strong>，然后点击两次<strong>确定</strong>）</li></ol></li><li>选择<strong>使用复印机</strong></li><li><strong>将USB插入</strong>打印机右侧的端口。请稍候。</li><li>选择<strong>将文件保存到外部存储器</strong>（如果此选项未出现，请点击屏幕右上角的USB图标）</li><li>将文件正面朝下放在<strong>玻璃板</strong>上，或正面朝上放在<strong>顶部进纸器</strong>中</li><li>更改屏幕上的任何<strong>设置</strong></li><li>按下<strong>开始按钮</strong><ol><li>如果使用玻璃板，要将另一页扫描到同一文件，请将下一页放在玻璃板上，按<strong>开始</strong>，然后重复直到所有页面都扫描完毕</li></ol></li><li>扫描完最后一页后，按<strong>完成</strong>，然后再次按<strong>开始按钮</strong>将文件保存到USB</li><li>按下打印机上的访问按钮，并选择屏幕右上角的<strong>注销</strong></li><li>带上您的<strong>USB</strong>和<strong>原始文件</strong></li></ol>",
        final_printing_pc: "请使用图书馆电脑将您的文件发送到打印队列，然后从任何一台打印机上释放。",
        final_printing_usb: "请将您的USB驱动器插入打印机，并按照屏幕上的说明打印您的文件。",
        final_printing_device: "请使用“快速打印”服务将您的文件通过电子邮件发送到打印队列，然后从任何一台打印机上释放。",
        final_printing_unknown: "您的信用额度足够。请到图书馆打印机完成您的打印工作。",
    },
    'zh-HK': {
        main_title: '打印、影印、掃描',
        select_language: '選擇您的語言',
        what_to_do: '您今天想做什麼？',
        printing: '打印',
        photocopying: '影印',
        scanning: '掃描',
        has_usb: '您有USB嗎？',
        no_usb_title: '我們的打印機只能掃描到USB，不能掃描到您的電子郵件地址。',
        no_usb_body: '請諮詢工作人員購買USB。',
        how_many_pages: '多少頁？',
        how_many_pages_print: '您想打印多少頁？',
        how_many_pages_scan: '您需要掃描多少頁？',
        next: '下一步',
        not_sure: '我不確定',
        paper_size: '您需要什麼尺寸的紙張？',
        color_choice: '您需要哪種顏色？',
        color: '彩色',
        bw: '黑白',
        cost_title_print: '您的打印費用為：',
        cost_title_copy: '您的影印費用為：',
        cost_title_scan: '您的掃描費用為：',
        has_card: '您有圖書證嗎？',
        yes: '是',
        no: '否',
        has_credit: '您的信用額度足夠嗎？',
        add_value_title: '為您的圖書證充值',
        add_value_body: '1. 在打印亭選擇<strong>充值</strong><br>2. 掃描您的圖書證並輸入密碼<br>3. 選擇<strong>下一步</strong><br>4. 您可以通過<strong>EFTPOS</strong>或<strong>現金</strong>充值（按照亭屏幕上的說明操作）',
        check_balance_title: '如何查詢餘額',
        check_balance_body: '',
        print_source: '您從哪裡打印？',
        library_pc: '圖書館電腦',
        quick_print_pc: '快速打印電腦',
        usb_drive: 'USB',
        personal_device: '個人設備（如手機、筆記本電腦）',
        instructions: '說明',
        instructions_scanning: '掃描說明',
        back: '返回',
        restart: '重新開始',
        skip: '跳過',
        price_list: '價目表',
        price_a4_bw: 'A4黑白打印/影印',
        price_a3_bw: 'A3黑白打印/影印',
        price_a4_color: 'A4彩色打印/影印',
        price_a3_color: 'A3彩色打印/影印',
        scan_prices: '掃描價格',
        scan_a4: 'A4掃描（每頁）',
        scan_a3: 'A3掃描（每頁）',
        final_guest_ticket_title: "購買訪客票",
        final_guest_ticket_body: "<ol><li>在打印亭選擇<strong>打印、影印和掃描票</strong></li><li>您可以通過<strong>EFTPOS</strong>或<strong>現金</strong>充值（按照亭屏幕上的說明操作）</li><li>如果用現金支付，將自動打印出<strong>訪客票</strong>。如果用EFTPOS支付，您需要選擇<strong>是</strong>打印出訪客票。您在打印、影印和掃描時需要使用此票。</li></ol>",
        final_no_credit_body: "您的帳戶餘額不足。請到服務台為您的卡充值。",
        final_photocopying_ok: '<ol><li>登入任何一部圖書館打印機。<ol type="a"><li>掃描您的<strong>圖書證</strong>或<strong>訪客票條碼</strong>。</li><li>如果您使用的是圖書證，請輸入您的密碼（點擊<strong>密碼欄位</strong>，點擊<strong>鍵盤圖示</strong>，輸入您的<strong>密碼</strong>，然後點擊兩次<strong>確定</strong>）。</li></ol></li><li>選擇<strong>使用影印機</strong>和<strong>影印</strong></li><li>將您的文件正面朝下放在玻璃面上</li><li>使用打印機螢幕調整掃描設定</li><li>按<strong>開始按鈕</strong>掃描第一頁</li><li>若要影印更多頁面，請將下一個文件放在玻璃面上，然後再次按<strong>開始按鈕</strong>。對所有頁面重複此操作。</li><li>掃描完最後一頁後，在螢幕上按<strong>完成</strong>，然後再次按<strong>開始按鈕</strong>以釋放您的打印作業</li><li>要登出，請按打印機上的<strong>存取按鈕</strong>，然後在螢幕上按<strong>登出</strong>。</li></ol>',
        final_scanning_ok: "<ol><li>登入打印機：<ol><li>掃描您的圖書證或訪客票條形碼</li><li>如果您使用圖書證，請輸入密碼（點擊密碼字段，點擊鍵盤圖標，輸入密碼，然後點擊兩次確定）</li></ol></li><li>選擇<strong>使用影印機</strong></li><li><strong>將USB插入</strong>打印機右側的端口。請稍候。</li><li>選擇<strong>將文件保存到外部存儲器</strong>（如果此選項未出現，請點擊屏幕右上角的USB圖標）</li><li>將文件正面朝下放在<strong>玻璃板</strong>上，或正面朝上放在<strong>頂部進紙器</strong>中</li><li>更改屏幕上的任何<strong>設置</strong></li><li>按下<strong>開始按鈕</strong><ol><li>如果使用玻璃板，要將另一頁掃描到同一文件，請將下一頁放在玻璃板上，按<strong>開始</strong>，然後重複直到所有頁面都掃描完畢</li></ol></li><li>掃描完最後一頁後，按<strong>完成</strong>，然後再次按<strong>開始按鈕</strong>將文件保存到USB</li><li>按下打印機上的訪問按鈕，並選擇屏幕右上角的<strong>註銷</strong></li><li>帶上您的<strong>USB</strong>和<strong>原始文件</strong></li></ol>",
        final_printing_pc: "請使用圖書館電腦將您的文件發送到打印隊列，然後從任何一台打印機上釋放。",
        final_printing_usb: "請將您的USB插入打印機，並按照屏幕上的說明打印您的文件。",
        final_printing_device: "請使用“快速打印”服務將您的文件通過電子郵件發送到打印隊列，然後從任何一台打印机上釋放。",
        final_printing_unknown: "您的信用額度足夠。請到圖書館打印機完成您的打印工作。",
    },
    'ne': {
        main_title: 'प्रिन्ट, प्रतिलिपि, स्क्यान',
        select_language: 'आफ्नो भाषा चयन गर्नुहोस्',
        what_to_do: 'आज तपाईं के गर्न चाहनुहुन्छ?',
        printing: 'प्रिन्टिङ',
        photocopying: 'फोटोकपी',
        scanning: 'स्क्यानिङ',
        has_usb: 'के तपाईंसँग USB ड्राइभ छ?',
        no_usb_title: 'हाम्रो प्रिन्टरले USB मा मात्र स्क्यान गर्न सक्छ, तपाईंको इमेलमा होइन।',
        no_usb_body: 'USB ड्राइभ किन्न कृपया कर्मचारी सदस्यलाई सोध्नुहोस्।',
        how_many_pages: 'कति पृष्ठहरू?',
        how_many_pages_print: 'तपाईं कति पृष्ठ प्रिन्ट गर्न चाहनुहुन्छ?',
        how_many_pages_scan: 'तपाईंले कति पृष्ठ स्क्यान गर्न आवश्यक छ?',
        next: 'अर्को',
        not_sure: 'मलाई थाहा छैन',
        paper_size: 'तपाईंलाई कुन साइजको कागज चाहिन्छ?',
        color_choice: 'तपाईंलाई कुन रङ चाहिन्छ?',
        color: 'रंगीन',
        bw: 'कालो र सेतो',
        cost_title_print: 'तपाईंको प्रिन्टिङको लागत:',
        cost_title_copy: 'तपाईंको फोटोकपीको लागत:',
        cost_title_scan: 'तपाईंको स्क्यानको लागत:',
        has_card: 'के तपाईंसँग पुस्तकालय कार्ड छ?',
        yes: 'छ',
        no: 'छैन',
        has_credit: 'के तपाईंसँग पर्याप्त क्रेडिट छ?',
        add_value_title: 'आफ्नो पुस्तकालय कार्डमा पैसा थप्नुहोस्',
        add_value_body: '<ol><li>प्रिन्टिङ किओस्कमा <strong>Add Value</strong> चयन गर्नुहोस्</li><li>आफ्नो पुस्तकालय कार्ड स्क्यान गर्नुहोस् र पासवर्ड हाल्नुहोस्</li><li><strong>Next</strong> चयन गर्नुहोस्</li><li>तपाईं <strong>EFTPOS</strong> वा <strong>नगद</strong>द्वारा पैसा थप्न सक्नुहुन्छ (किओस्क स्क्रिनमा निर्देशनहरू पालना गर्नुहोस्)</li></ol>',
        check_balance_title: 'आफ्नो ब्यालेन्स कसरी जाँच गर्ने',
        check_balance_body: '',
        print_source: 'तपाईं कहाँबाट प्रिन्ट गर्दै हुनुहुन्छ?',
        library_pc: 'पुस्तकालयको कम्प्युटर',
        quick_print_pc: 'द्रुत प्रिन्ट पीसी',
        usb_drive: 'USB ड्राइभ',
        personal_device: 'व्यक्तिगत उपकरण (जस्तै फोन, ल्यापटप)',
        instructions: 'निर्देशनहरू',
        instructions_scanning: 'स्क्यानिङका लागि निर्देशनहरू',
        back: 'पछाडि',
        restart: 'पुनः सुरु गर्नुहोस्',
        skip: 'छोड्नुहोस्',
        price_list: 'मूल्य सूची',
        price_a4_bw: 'A4 कालो र सेतो प्रिन्ट/प्रतिलिपि',
        price_a3_bw: 'A3 कालो र सेतो प्रिन्ट/प्रतिलिपि',
        price_a4_color: 'A4 रंगीन प्रिन्ट/प्रतिलिपि',
        price_a3_color: 'A3 रंगीन प्रिन्ट/प्रतिलिपि',
        scan_prices: 'स्क्यानिङ मूल्यहरू',
        scan_a4: 'A4 स्क्यान (प्रति पृष्ठ)',
        scan_a3: 'A3 स्क्यान (प्रति पृष्ठ)',
        final_guest_ticket_title: "अतिथि टिकट किन्नुहोस्",
        final_guest_ticket_body: "<ol><li>प्रिन्टिङ किओस्कमा <strong>प्रिन्ट, प्रतिलिपि र स्क्यानिङ टिकट</strong> चयन गर्नुहोस्</li><li>तपाईं <strong>EFTPOS</strong> वा <strong>नगद</strong>द्वारा पैसा थप्न सक्नुहुन्छ (किओस्क स्क्रिनमा निर्देशनहरू पालना गर्नुहोस्)</li><li>नगदमा भुक्तानी गर्दा, <strong>अतिथि टिकट</strong> स्वतः प्रिन्ट हुनेछ। EFTPOS द्वारा भुक्तानी गर्दा, तपाईंले अतिथि टिकट प्रिन्ट गर्न <strong>Yes</strong> चयन गर्नुपर्नेछ। तपाईंले प्रिन्टिङ, प्रतिलिपि र स्क्यानिङ गर्दा यो टिकट प्रयोग गर्नुपर्नेछ।</li></ol>",
        final_no_credit_body: "तपाईंको खातामा पर्याप्त क्रेडिट छैन। कृपया आफ्नो कार्डमा पैसा थप्न सेवा डेस्कमा जानुहोस्।",
        final_photocopying_ok: '<ol><li>कुनै पनि पुस्तकालय प्रिन्टरमा साइन इन गर्नुहोस्।<ol type="a"><li>आफ्नो <strong>पुस्तकालय कार्ड</strong> वा <strong>अतिथि टिकट बारकोड</strong> स्क्यान गर्नुहोस्।</li><li>यदि तपाइँ आफ्नो पुस्तकालय कार्ड प्रयोग गर्दै हुनुहुन्छ भने, आफ्नो पासवर्ड प्रविष्ट गर्नुहोस् (<strong>पासवर्ड फिल्ड</strong> मा ट्याप गर्नुहोस्, <strong>किबोर्ड आइकन</strong> मा ट्याप गर्नुहोस्, आफ्नो <strong>पासवर्ड</strong> प्रविष्ट गर्नुहोस्, र दुई पटक <strong>OK</strong> ट्याप गर्नुहोस्)।</li></ol></li><li><strong>Use Copier</strong> र <strong>Copy</strong> छान्नुहोस्</li><li>आफ्नो कागजातलाई सिसामा घोप्टो पारेर राख्नुहोस्</li><li>स्क्यान सेटिङहरू समायोजन गर्न प्रिन्टर स्क्रिन प्रयोग गर्नुहोस्</li><li>पहिलो पृष्ठ स्क्यान गर्न <strong>Start बटन</strong> थिच्नुहोस्</li><li>थप पृष्ठहरूको लागि, अर्को वस्तुलाई सिसामा राख्नुहोस्, र फेरि <strong>Start बटन</strong> थिच्नुहोस्। सबै पृष्ठहरूको लागि दोहोर्याउनुहोस्।</li><li>अन्तिम पृष्ठ स्क्यान गरिसकेपछि, स्क्रिनमा <strong>Finish</strong> थिच्नुहोस् र आफ्नो प्रिन्टिङ रिलिज गर्न फेरि <strong>Start बटन</strong> थिच्नुहोस्</li><li>लग आउट गर्न, प्रिन्टरमा रहेको <strong>Access बटन</strong> थिच्नुहोस्, र स्क्रिनमा <strong>Log Out</strong> थिच्नुहोस्।</li></ol>',
        final_scanning_ok: "<ol><li>प्रिन्टरमा साइन इन गर्नुहोस्:<ol><li>आफ्नो पुस्तकालय कार्ड वा अतिथि टिकट बारकोड स्क्यान गर्नुहोस्</li><li>यदि तपाईं आफ्नो पुस्तकालय कार्ड प्रयोग गर्दै हुनुहुन्छ भने, आफ्नो पासवर्ड हाल्नुहोस् (पासवर्ड फिल्डमा ट्याप गर्नुहोस्, किबोर्ड आइकनमा ट्याप गर्नुहोस्, आफ्नो पासवर्ड टाइप गर्नुहोस्, र दुई पटक <strong>OK</strong> ट्याप गर्नुहोस्)</li></ol></li><li><strong>Use Copier</strong> छान्नुहोस्</li><li>प्रिन्टरको दायाँ छेउको पोर्टमा <strong>आफ्नो USB घुसाउनुहोस्</strong>। केही सेकेन्ड पर्खनुहोस्।</li><li><strong>Save a document to external memory</strong> चयन गर्नुहोस् (यदि यो विकल्प देखा परेन भने, स्क्रिनको माथिल्लो-दायाँ कुनामा रहेको USB आइकनमा ट्याप गर्नुहोस्)</li><li>आफ्नो कागजातलाई <strong>सिसामा</strong> अनुहार तल वा <strong>माथिल्लो फिडरमा</strong> अनुहार माथि राख्नुहोस्</li><li>स्क्रिनमा कुनै पनि <strong>सेटिङहरू</strong> परिवर्तन गर्नुहोस्</li><li><strong>Start बटन</strong> थिच्नुहोस्<ol><li>यदि सिसा प्रयोग गर्दै हुनुहुन्छ भने, उही फाइलमा अर्को पृष्ठ स्क्यान गर्न, अर्को पृष्ठलाई सिसामा राख्नुहोस्, <strong>Start</strong> थिच्नुहोस्, र सबै पृष्ठहरू स्क्यान नभएसम्म दोहोर्याउनुहोस्</li></ol></li><li>अन्तिम पृष्ठ पछि, <strong>Finish</strong> थिच्नुहोस्, र फाइललाई आफ्नो USB मा बचत गर्न फेरि <strong>Start बटन</strong> थिच्नुहोस्</li><li>प्रिन्टरमा Access बटन थिच्नुहोस् र स्क्रिनको माथिल्लो-दायाँ कुनामा <strong>Log out</strong> चयन गर्नुहोस्</li><li>आफ्नो <strong>USB</strong> र <strong>सक्कली कागजातहरू</strong> साथमा लिनुहोस्</li></ol>",
        final_printing_pc: "कृपया आफ्नो कागजात प्रिन्टर लाममा पठाउन पुस्तकालयको कम्प्युटर प्रयोग गर्नुहोस्, त्यसपछि कुनै पनि प्रिन्टरबाट यसलाई रिलिज गर्नुहोस्।",
        final_printing_usb: "कृपया आफ्नो USB ड्राइभ प्रिन्टरमा घुसाउनुहोस् र आफ्नो कागजात प्रिन्ट गर्न स्क्रिनमा दिइएका निर्देशनहरू पालना गर्नुहोस्।",
        final_printing_device: "कृपया आफ्नो कागजात इमेलमार्फत प्रिन्ट लाममा पठाउन 'Quick Print' सेवा प्रयोग गर्नुहोस्, त्यसपछि कुनै पनि प्रिन्टरबाट यसलाई रिलिज गर्नुहोस्।",
        final_printing_unknown: "तपाईंसँग पर्याप्त क्रेडिट छ। कृपया आफ्नो प्रिन्टिङ कार्य पूरा गर्न पुस्तकालय प्रिन्टरमा जानुहोस्।",
    },
    'it': {
        main_title: 'Stampa, Copia, Scansiona',
        select_language: 'Seleziona la tua lingua',
        what_to_do: 'Cosa vorresti fare oggi?',
        printing: 'Stampa',
        photocopying: 'Fotocopia',
        scanning: 'Scansione',
        has_usb: 'Hai una chiavetta USB?',
        no_usb_title: 'Le nostre stampanti possono scansionare solo su USB, non al tuo indirizzo email.',
        no_usb_body: 'Rivolgiti a un membro dello staff per acquistare una chiavetta USB.',
        how_many_pages: 'Quante pagine?',
        how_many_pages_print: 'Quante pagine vorresti stampare?',
        how_many_pages_scan: 'Quante pagine devi scansionare?',
        next: 'Avanti',
        not_sure: 'Non sono sicuro',
        paper_size: 'Quale formato di carta desideri?',
        color_choice: 'Quale colore desideri?',
        color: 'A colori',
        bw: 'Bianco e Nero',
        cost_title_print: 'La tua stampa costerà:',
        cost_title_copy: 'La tua fotocopia costerà:',
        cost_title_scan: 'La tua scansione costerà:',
        has_card: 'Hai una tessera della biblioteca?',
        yes: 'Sì',
        no: 'No',
        has_credit: 'Hai abbastanza credito?',
        add_value_title: 'Aggiungi credito alla tua tessera',
        add_value_body: '<ol><li>Seleziona <strong>Aggiungi Credito</strong> presso il chiosco di stampa</li><li>Scansiona la tua tessera e inserisci la password</li><li>Seleziona <strong>Avanti</strong></li><li>Puoi aggiungere denaro tramite <strong>EFTPOS</strong> o in <strong>contanti</strong> (segui le istruzioni sullo schermo del chiosco)</li></ol>',
        check_balance_title: 'Come controllare il tuo saldo',
        check_balance_body: '',
        print_source: 'Da dove stai stampando?',
        library_pc: 'PC della biblioteca',
        quick_print_pc: 'PC per stampa rapida',
        usb_drive: 'Chiavetta USB',
        personal_device: 'Dispositivo personale (es. telefono, laptop)',
        instructions: 'Istruzioni',
        instructions_scanning: 'Istruzioni per la scansione',
        back: 'Indietro',
        restart: 'Ricomincia',
        skip: 'Salta',
        price_list: 'Listino prezzi',
        price_a4_bw: 'Stampa/Copia A4 B/N',
        price_a3_bw: 'Stampa/Copia A3 B/N',
        price_a4_color: 'Stampa/Copia A4 a colori',
        price_a3_color: 'Stampa/Copia A3 a colori',
        scan_prices: 'Prezzi scansione',
        scan_a4: 'Scansione A4 (per pagina)',
        scan_a3: 'Scansione A3 (per pagina)',
        final_guest_ticket_title: "Acquista un biglietto ospite",
        final_guest_ticket_body: "<ol><li>Seleziona <strong>Biglietto Stampa, Copia e Scansione</strong> presso il chiosco di stampa</li><li>Puoi aggiungere denaro tramite <strong>EFTPOS</strong> o in <strong>contanti</strong> (segui le istruzioni sullo schermo del chiosco)</li><li>Se paghi in contanti, un <strong>Biglietto Ospite</strong> verrà stampato automaticamente. Se paghi con EFTPOS, dovrai selezionare <strong>Sì</strong> per stampare il Biglietto Ospite. Dovrai usare questo biglietto per stampare, copiare e scansionare.</li></ol>",
        final_no_credit_body: "Il tuo account non ha abbastanza credito. Per favore, visita il banco assistenza per ricaricare la tua tessera.",
        final_photocopying_ok: '<ol><li>Accedi a una qualsiasi stampante della biblioteca.<ol type="a"><li>Scansiona la tua <strong>tessera della biblioteca</strong> o il <strong>codice a barre del biglietto ospite</strong>.</li><li>Se stai usando la tessera della biblioteca, inserisci la tua password (tocca il <strong>campo password</strong>, tocca l\'<strong>icona della tastiera</strong>, inserisci la tua <strong>password</strong> e tocca due volte <strong>OK</strong>).</li></ol></li><li>Scegli <strong>Usa Fotocopiatrice</strong> e <strong>Copia</strong></li><li>Posiziona il documento a faccia in giù sul vetro</li><li>Usa lo schermo della stampante per regolare le impostazioni di scansione</li><li>Premi il <strong>pulsante Start</strong> per scansionare la prima pagina</li><li>Per più pagine, posiziona l\'elemento successivo sul vetro e premi di nuovo il <strong>pulsante Start</strong>. Ripeti per tutte le pagine.</li><li>Dopo aver scansionato l\'ultima pagina, premi <strong>Fine</strong> sullo schermo e premi di nuovo il <strong>pulsante Start</strong> per rilasciare la stampa</li><li>Per disconnetterti, premi il <strong>pulsante Accesso</strong> sulla stampante e <strong>Esci</strong> sullo schermo.</li></ol>',
        final_scanning_ok: "<ol><li>Accedi alla stampante:<ol><li>Scansiona il codice a barre della tua tessera della biblioteca o del biglietto ospite</li><li>Se usi la tessera della biblioteca, inserisci la tua password (tocca il campo <strong>password</strong>, tocca l'icona della <strong>tastiera</strong>, digita la tua <strong>password</strong> e tocca <strong>OK</strong> due volte)</li></ol></li><li>Scegli <strong>Usa Fotocopiatrice</strong></li><li><strong>Inserisci la tua USB</strong> nella porta sul lato destro della stampante. Aspetta qualche secondo.</li><li>Seleziona <strong>Salva un documento su memoria esterna</strong> (Se questa opzione non appare, tocca l'icona USB in alto a destra dello schermo)</li><li>Posiziona il tuo documento a faccia in giù sul <strong>vetro</strong>, o a faccia in su nell'<strong>alimentatore superiore</strong></li><li>Cambia eventuali <strong>impostazioni</strong> sullo schermo</li><li>Premi il pulsante <strong>Start</strong><ol><li>Se usi il vetro, per scansionare un'altra pagina nello stesso file, posiziona la pagina successiva sul vetro, premi <strong>Start</strong> e ripeti finché tutte le pagine non sono state scansionate</li></ol></li><li>Dopo l'ultima pagina, premi <strong>Fine</strong>, e premi di nuovo il pulsante <strong>Start</strong> per salvare il file sulla tua USB</li><li>Premi il pulsante Accesso sulla stampante e seleziona <strong>Esci</strong> in alto a destra dello schermo</li><li>Prendi la tua <strong>USB</strong> e i <strong>documenti originali</strong> con te</li></ol>",
        final_printing_pc: "Per favore, usa un computer della biblioteca per inviare il tuo documento alla coda di stampa, poi rilascialo da una qualsiasi stampante.",
        final_printing_usb: "Per favore, inserisci la tua chiavetta USB in una stampante e segui le istruzioni sullo schermo per stampare il tuo documento.",
        final_printing_device: "Per favore, usa il servizio 'Stampa Rapida' per inviare il tuo documento via email alla coda di stampa, poi rilascialo da una qualsiasi stampante.",
        final_printing_unknown: "Hai abbastanza credito. Per favore, procedi a una stampante della biblioteca per completare il tuo lavoro di stampa.",
    },
    'el': {
        main_title: 'Εκτύπωση, Αντιγραφή, Σάρωση',
        select_language: 'Επιλέξτε τη γλώσσα σας',
        what_to_do: 'Τι θα θέλατε να κάνετε σήμερα;',
        printing: 'Εκτύπωση',
        photocopying: 'Αντιγραφή',
        scanning: 'Σάρωση',
        has_usb: 'Έχετε USB stick;',
        no_usb_title: 'Οι εκτυπωτές μας μπορούν να σαρώσουν μόνο σε USB, όχι στη διεύθυνση email σας.',
        no_usb_body: 'Απευθυνθείτε σε ένα μέλος του προσωπικού για να αγοράσετε ένα USB stick.',
        how_many_pages: 'Πόσες σελίδες;',
        how_many_pages_print: 'Πόσες σελίδες θα θέλατε να εκτυπώσετε;',
        how_many_pages_scan: 'Πόσες σελίδες πρέπει να σαρώσετε;',
        next: 'Επόμενο',
        not_sure: 'Δεν είμαι σίγουρος',
        paper_size: 'Τι μέγεθος χαρτιού χρειάζεστε;',
        color_choice: 'Ποιο χρώμα χρειάζεστε;',
        color: 'Έγχρωμο',
        bw: 'Ασπρόμαυρο',
        cost_title_print: 'Η εκτύπωσή σας θα κοστίσει:',
        cost_title_copy: 'Η αντιγραφή σας θα κοστίσει:',
        cost_title_scan: 'Η σάρωσή σας θα κοστίσει:',
        has_card: 'Έχετε κάρτα βιβλιοθήκης;',
        yes: 'Ναι',
        no: 'Όχι',
        has_credit: 'Έχετε αρκετή πίστωση;',
        add_value_title: 'Προσθήκη χρημάτων στην κάρτα σας',
        add_value_body: '<ol><li>Επιλέξτε <strong>Προσθήκη Αξίας</strong> στο Κιόσκι Εκτύπωσης</li><li>Σαρώστε την κάρτα βιβλιοθήκης σας και εισαγάγετε τον κωδικό πρόσβασής σας</li><li>Επιλέξτε <strong>Επόμενο</strong></li><li>Μπορείτε να προσθέσετε χρήματα είτε με <strong>EFTPOS</strong> είτε με <strong>μετρητά</strong> (ακολουθήστε τις οδηγίες στην οθόνη του κιоск)</li></ol>',
        check_balance_title: 'Πώς να ελέγξετε το υπόλοιπό σας',
        check_balance_body: '',
        print_source: 'Από πού εκτυπώνετε;',
        library_pc: 'Υπολογιστής βιβλιοθήκης',
        quick_print_pc: 'Υπολογιστής γρήγορης εκτύπωσης',
        usb_drive: 'USB Stick',
        personal_device: 'Προσωπική συσκευή (π.χ. τηλέφωνο, laptop)',
        instructions: 'Οδηγίες',
        instructions_scanning: 'Οδηγίες για σάρωση',
        back: 'Πίσω',
        restart: 'Επανεκκίνηση',
        skip: 'Παράλειψη',
        price_list: 'Τιμοκατάλογος',
        price_a4_bw: 'Εκτύπωση/Αντίγραφο Α4 Α/Μ',
        price_a3_bw: 'Εκτύπωση/Αντίγραφο Α3 Α/Μ',
        price_a4_color: 'Εκτύπωση/Αντίγραφο Α4 Έγχρωμο',
        price_a3_color: 'Εκτύπωση/Αντίγραφο Α3 Έγχρωμο',
        scan_prices: 'Τιμές Σάρωσης',
        scan_a4: 'Σάρωση Α4 (ανά σελίδα)',
        scan_a3: 'Σάρωση Α3 (ανά σελίδα)',
        final_guest_ticket_title: "Αγορά εισιτηρίου επισκέπτη",
        final_guest_ticket_body: "<ol><li>Επιλέξτε <strong>Εισιτήριο Εκτύπωσης, Αντιγραφής και Σάρωσης</strong> στο Κιόσκι Εκτύπωσης</li><li>Μπορείτε να προσθέσετε χρήματα είτε με <strong>EFTPOS</strong> είτε με <strong>μετρητά</strong> (ακολουθήστε τις οδηγίες στην οθόνη του κιоск)</li><li>Εάν πληρώνετε με μετρητά, θα εκτυπωθεί αυτόματα ένα <strong>Εισιτήριο Επισκέπτη</strong>. Εάν πληρώνετε με EFTPOS, θα πρέπει να επιλέξετε <strong>Ναι</strong> για να εκτυπωθεί το Εισιτήριο Επισκέπτη. Θα χρειαστεί να χρησιμοποιήσετε αυτό το εισιτήριο κατά την εκτύπωση, αντιγραφή και σάρωση.</li></ol>",
        final_no_credit_body: "Ο λογαριασμός σας δεν έχει αρκετή πίστωση. Παρακαλώ επισκεφθείτε το γραφείο εξυπηρέτησης για να προσθέσετε χρήματα στην κάρτα σας.",
        final_photocopying_ok: '<ol><li>Συνδεθείτε σε οποιονδήποτε εκτυπωτή της βιβλιοθήκης.<ol type="a"><li>Σαρώστε την <strong>κάρτα βιβλιοθήκης</strong> σας ή τον <strong>γραμμωτό κώδικα του εισιτηρίου επισκέπτη</strong>.</li><li>Εάν χρησιμοποιείτε την κάρτα βιβλιοθήκης σας, εισαγάγετε τον κωδικό πρόσβασής σας (πατήστε το <strong>πεδίο κωδικού πρόσβασης</strong>, πατήστε το <strong>εικονίδιο του πληκτρολογίου</strong>, εισαγάγετε τον <strong>κωδικό πρόσβασής</strong> σας και πατήστε δύο φορές <strong>OK</strong>).</li></ol></li><li>Επιλέξτε <strong>Χρήση Αντιγραφικού</strong> και <strong>Αντιγραφή</strong></li><li>Τοποθετήστε το έγγραφό σας με την όψη προς τα κάτω στο γυαλί</li><li>Χρησιμοποιήστε την οθόνη του εκτυπωτή για να προσαρμόσετε τις ρυθμίσεις σάρωσης</li><li>Πατήστε το <strong>κουμπί Έναρξη</strong> για να σαρώσετε την πρώτη σελίδα</li><li>Για περισσότερες σελίδες, τοποθετήστε το επόμενο αντικείμενο στο γυαλί και πατήστε ξανά το <strong>κουμπί Έναρξη</strong>. Επαναλάβετε για όλες τις σελίδες.</li><li>Αφού σαρωθεί η τελευταία σελίδα, πατήστε <strong>Τέλος</strong> στην οθόνη και πατήστε ξανά το <strong>κουμπί Έναρξη</strong> για να απελευθερώσετε την εκτύπωσή σας</li><li>Για να αποσυνδεθείτε, πατήστε το <strong>κουμπί Πρόσβασης</strong> στον εκτυπωτή και <strong>Αποσύνδεση</strong> στην οθόνη.</li></ol>',
        final_scanning_ok: "<ol><li>Συνδεθείτε στον εκτυπωτή:<ol><li>Σαρώστε τον γραμμωτό κώδικα της κάρτας βιβλιοθήκης ή του εισιτηρίου επισκέπτη</li><li>Εάν χρησιμοποιείτε την κάρτα βιβλιοθήκης σας, εισαγάγετε τον κωδικό πρόσβασής σας (πατήστε το πεδίο <strong>κωδικού πρόσβασης</strong>, πατήστε το εικονίδιο του <strong>πληκτρολογίου</strong>, πληκτρολογήστε τον <strong>κωδικό</strong> σας και πατήστε <strong>ΟΚ</strong> δύο φορές)</li></ol></li><li>Επιλέξτε <strong>Χρήση Αντιγραφικού</strong></li><li><strong>Εισαγάγετε το USB σας</strong> στη θύρα στη δεξιά πλευρά του εκτυπωτή. Περιμένετε μερικά δευτερόλεπτα.</li><li>Επιλέξτε <strong>Αποθήκευση εγγράφου σε εξωτερική μνήμη</strong> (Εάν αυτή η επιλογή δεν εμφανίζεται, πατήστε το εικονίδιο USB στην επάνω δεξιά γωνία της οθόνης)</li><li>Τοποθετήστε το έγγραφό σας με την όψη προς τα κάτω στο <strong>γυαλί</strong>, ή με την όψη προς τα πάνω στον <strong>επάνω τροφοδότη</strong></li><li>Αλλάξτε τυχόν <strong>ρυθμίσεις</strong> στην οθόνη</li><li>Πατήστε το κουμπί <strong>Έναρξη</strong><ol><li>Εάν χρησιμοποιείτε το γυαλί, για να σαρώσετε μια άλλη σελίδα στο ίδιο αρχείο, τοποθετήστε την επόμενη σελίδα στο γυαλί, πατήστε <strong>Έναρξη</strong> και επαναλάβετε μέχρι να σαρωθούν όλες οι σελίδες</li></ol></li><li>Μετά την τελευταία σελίδα, πατήστε <strong>Τέλος</strong> και πατήστε ξανά το κουμπί <strong>Έναρξη</strong> για να αποθηκεύσετε το αρχείο στο USB σας</li><li>Πατήστε το κουμπί Πρόσβαση στον εκτυπωτή και επιλέξτε <strong>Αποσύνδεση</strong> στην επάνω δεξιά γωνία της οθόνης</li><li>Πάρτε το <strong>USB</strong> και τα <strong>πρωτότυπα έγγραφά</strong> σας μαζί σας</li></ol>",
        final_printing_pc: "Παρακαλώ χρησιμοποιήστε έναν υπολογιστή της βιβλιοθήκης για να στείλετε το έγγραφό σας στην ουρά εκτύπωσης και, στη συνέχεια, απελευθερώστε το από οποιονδήποτε εκτυπωτή.",
        final_printing_usb: "Παρακαλώ εισαγάγετε το USB stick σας σε έναν εκτυπωτή και ακολουθήστε τις οδηγίες στην οθόνη για να εκτυπώσετε το έγγραφό σας.",
        final_printing_device: "Παρακαλώ χρησιμοποιήστε την υπηρεσία 'Γρήγορη Εκτύπωση' για να στείλετε το έγγραφό σας μέσω email στην ουρά εκτύπωσης και, στη συνέχεια, απελευθερώστε το από οποιονδήποτε εκτυπωτή.",
        final_printing_unknown: "Έχετε αρκετή πίστωση. Παρακαλώ προχωρήστε σε έναν εκτυπωτή της βιβλιοθήκης για να ολοκληρώσετε την εκτύπωσή σας.",
    },
};

function translatePage(lang: string) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const htmlEl = el as HTMLElement;
        const key = htmlEl.dataset.translate;
        if (key && translations[lang] && translations[lang][key]) {
            htmlEl.innerHTML = translations[lang][key];
        }
    });
}


// --- CORE LOGIC ---
function showStep(stepId: string, isBack = false) {
    const currentStep = document.querySelector('.step.active');
    if (currentStep && !isBack) {
        stepHistory.push(currentStep.id);
    }

    if (stepId === 'step-cost-confirmation') {
        const canCalculate = userSelections.service &&
                                (userSelections.service === 'scanning' || userSelections.size) &&
                                (userSelections.service === 'scanning' || userSelections.color);

        if (canCalculate && userSelections.pages !== 'unknown') {
            let titleKey = 'cost_title_print';
            if (userSelections.service === 'scanning') {
                titleKey = 'cost_title_scan';
            } else if (userSelections.service === 'photocopying') {
                titleKey = 'cost_title_copy';
            }
            costConfirmationTitleEl.dataset.translate = titleKey; // Set key for translation
            
            const totalCost = calculateCost();
            costDisplayEl.innerHTML = `<span>$${totalCost.toFixed(2)}</span>`;
        } else {
            costConfirmationTitleEl.dataset.translate = 'has_card';
            costDisplayEl.innerHTML = '';
        }
    }

    if (stepId === 'step-pages') {
        if (userSelections.service === 'scanning') {
            pagesTitleEl.dataset.translate = 'how_many_pages_scan';
            scanHelpIcon.style.display = 'block';
        } else if (userSelections.service === 'printing') {
            pagesTitleEl.dataset.translate = 'how_many_pages_print';
            scanHelpIcon.style.display = 'none';
        } else {
            pagesTitleEl.dataset.translate = 'how_many_pages';
            scanHelpIcon.style.display = 'none';
        }
        unsurePagesBtn.style.display = 'block';
    } else {
        scanHelpIcon.style.display = 'none';
        unsurePagesBtn.style.display = 'none';
    }


    steps.forEach(step => step.classList.remove('active'));
    const nextStep = document.getElementById(stepId);
    if (nextStep) {
        nextStep.classList.add('active');
    }

    if (stepId === 'step-service') {
        navContainer.style.display = 'none';
        progressBarContainer.style.display = 'none';
    } else {
        navContainer.style.display = 'flex';
        progressBarContainer.style.display = 'block';
    }

    const finalActionSteps = ['step-print-source', 'step-final', 'step-add-value', 'step-how-to-check-balance', 'step-no-usb'];
    if (finalActionSteps.includes(stepId)) {
        skipBtn.style.display = 'none';
        priceHelpIcon.style.display = 'none';
    } else if (stepId === 'step-cost-confirmation' && userSelections.service === 'scanning') {
        skipBtn.style.display = 'none';
        priceHelpIcon.style.display = 'block';
    }
    else {
        skipBtn.style.display = 'block';
        priceHelpIcon.style.display = 'block';
    }
    
    backBtn.style.visibility = stepHistory.length > 0 ? 'visible' : 'hidden';
    updateProgressBar();
    // Re-apply translation to the new visible elements
    const currentLangEl = document.querySelector('.lang-btn.active') as HTMLElement;
    if (currentLangEl && currentLangEl.dataset.lang) {
      translatePage(currentLangEl.dataset.lang);
    }
}

function goBack() {
    if (stepHistory.length > 0) {
        const previousStepId = stepHistory.pop();
        if(previousStepId) {
          showStep(previousStepId, true);
        }
    }
}

function updateProgressBar() {
    const totalSteps = 5;
    let currentProgress = stepHistory.length;
    
    if(document.querySelector('#step-final.active, #step-add-value.active, #step-how-to-check-balance.active, #step-no-usb.active')) {
        currentProgress = totalSteps;
    }
    
    const percentage = (currentProgress / totalSteps) * 100;
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
}

function resetApp() {
    userSelections.service = null;
    userSelections.pages = 1;
    userSelections.size = null;
    userSelections.color = null;
    userSelections.hasCard = null;
    userSelections.hasCredit = null;
    userSelections.printSource = null;
    userSelections.hasUSB = null;
    
    pageCountInput.value = '1';
    stepHistory = [];
    showStep('step-service');
}

function skipToEnd() {
    const currentStep = document.querySelector('.step.active');

    if (currentStep && currentStep.id === 'step-pages' && userSelections.service === 'scanning') {
        showStep('step-card-check');
        return;
    }

    if (currentStep && currentStep.id === 'step-cost-confirmation') {
        userSelections.hasCard = 'yes';
        userSelections.hasCredit = 'yes';
        
        if (userSelections.service === 'printing') {
            showStep('step-print-source');
        } else {
            displayFinalMessage();
        }
    } 
    else {
        showStep('step-cost-confirmation');
    }
}

function calculateCost() {
    const rates = {
        print_copy: {
            A4: { bw: 0.40, color: 0.80 },
            A3: { bw: 0.70, color: 1.40 }
        },
        scan: {
            A4: { bw: 0.10, color: 0.10 },
            A3: { bw: 0.10, color: 0.10 }
        }
    };
    
    if (typeof userSelections.pages === 'string') return 0;

    if (userSelections.service === 'scanning') {
        const rate = rates.scan.A4.bw; // Since size is skipped, default to A4
        return userSelections.pages * rate;
    } else if (userSelections.size && userSelections.color) {
        const rate = rates.print_copy[userSelections.size][userSelections.color];
        return userSelections.pages * rate;
    }
    return 0;
}

function displayFinalMessage() {
    let messageKey = '';
    let titleKey = 'instructions';

    const service = userSelections.service;
    const hasCard = userSelections.hasCard === 'yes';
    const hasCredit = userSelections.hasCredit;

    if (!hasCard) {
        titleKey = "final_guest_ticket_title";
        messageKey = "final_guest_ticket_body";
    } else {
        if (hasCredit === 'no' || hasCredit === 'unknown') {
           return;
        }
        
        if (service === 'photocopying') {
            messageKey = "final_photocopying_ok";
        } else if (service === 'scanning') {
            titleKey = "instructions_scanning";
            messageKey = "final_scanning_ok";
        } else { // Printing
            switch (userSelections.printSource) {
                case 'pc':
                    messageKey = "final_printing_pc";
                    break;
                case 'usb':
                    messageKey = "final_printing_usb";
                    break;
                case 'quick-print-pc':
                case 'device':
                    messageKey = "final_printing_device";
                    break;
                default:
                    messageKey = "final_printing_unknown";
                    break;
            }
        }
    }
    const currentLangEl = document.querySelector('.lang-btn.active') as HTMLElement;
    const currentLang = (currentLangEl && currentLangEl.dataset.lang) || 'en';
    finalTitleEl.innerHTML = translations[currentLang][titleKey];
    finalMessageEl.innerHTML = translations[currentLang][messageKey];
    showStep('step-final');
}

function openModal(modal: HTMLElement) {
    modal.classList.add('modal-open');
}
function closeModal(modal: HTMLElement) {
    modal.classList.remove('modal-open');
}

appContainer.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const currentStep = target.closest('.step');
    if (!currentStep) return;

    if (currentStep.id === 'step-service' && target.dataset.service) {
        userSelections.service = target.dataset.service;
        if (userSelections.service === 'scanning') {
            showStep('step-usb-check');
        } else {
            showStep('step-pages');
        }
    }
    else if (currentStep.id === 'step-usb-check' && target.dataset.hasUsb) {
        userSelections.hasUSB = target.dataset.hasUsb;
        if (userSelections.hasUSB === 'no') {
            showStep('step-no-usb');
        } else {
            showStep('step-pages');
        }
    }
    else if (currentStep.id === 'step-pages' && target.id === 'submit-pages') {
        const pages = parseInt(pageCountInput.value, 10);
        if (pages > 0) {
            userSelections.pages = pages;
            if (userSelections.service === 'scanning') {
                showStep('step-cost-confirmation');
            } else {
                showStep('step-size');
            }
        } else {
            alert('Please enter a valid number of pages.');
        }
    }
    else if (currentStep.id === 'step-pages' && target.id === 'unsure-pages') {
        userSelections.pages = 'unknown';
        if (userSelections.service === 'scanning') {
            showStep('step-cost-confirmation');
        } else {
            showStep('step-size');
        }
    }
    else if (currentStep.id === 'step-size' && target.dataset.size) {
        userSelections.size = target.dataset.size;
        showStep('step-color');
    }
    else if (currentStep.id === 'step-color' && target.dataset.color) {
        userSelections.color = target.dataset.color;
        showStep('step-cost-confirmation');
    }
    else if (currentStep.id === 'step-cost-confirmation' && target.id === 'cost-confirmation-next') {
        if (userSelections.service === 'scanning') {
            userSelections.hasCard = 'yes'; 
            showStep('step-credit-check');
        } else {
            showStep('step-card-check');
        }
    }
    else if (currentStep.id === 'step-card-check' && target.dataset.hasCard) {
        userSelections.hasCard = target.dataset.hasCard;
        if (userSelections.hasCard === 'yes') {
            showStep('step-credit-check');
        } else {
            displayFinalMessage();
        }
    }
    else if (currentStep.id === 'step-credit-check' && target.dataset.hasCredit) {
        userSelections.hasCredit = target.dataset.hasCredit;
        if (userSelections.hasCredit === 'no') {
            showStep('step-add-value');
        } else if (userSelections.hasCredit === 'unknown') {
            showStep('step-how-to-check-balance');
        }
        else if (userSelections.hasCredit === 'yes' && userSelections.service === 'printing') {
            if (userSelections.pages === 'unknown') {
                displayFinalMessage();
            } else {
                showStep('step-print-source');
            }
        } else {
            displayFinalMessage();
        }
    }
    else if (currentStep.id === 'step-print-source' && target.dataset.printSource) {
        userSelections.printSource = target.dataset.printSource;
        displayFinalMessage();
    }
});

backBtn.addEventListener('click', goBack);
restartBtn.addEventListener('click', resetApp);
skipBtn.addEventListener('click', skipToEnd);

priceHelpIcon.addEventListener('click', () => {
    if (userSelections.service === 'scanning') {
        openModal(scanPriceModal);
    } else {
        openModal(priceModal);
    }
});
modalCloseBtn.addEventListener('click', () => closeModal(priceModal));
priceModal.addEventListener('click', (e) => {
    if (e.target === priceModal) {
        closeModal(priceModal);
    }
});

scanHelpIcon.addEventListener('click', () => openModal(scanPriceModal));
scanModalCloseBtn.addEventListener('click', () => closeModal(scanPriceModal));
scanPriceModal.addEventListener('click', (e) => {
    if (e.target === scanPriceModal) {
        closeModal(scanPriceModal);
    }
});

minusBtn.addEventListener('click', () => {
    let currentValue = parseInt(pageCountInput.value, 10);
    if (currentValue > 1) {
        pageCountInput.value = (currentValue - 1).toString();
    }
});

plusBtn.addEventListener('click', () => {
    let currentValue = parseInt(pageCountInput.value, 10);
    pageCountInput.value = (currentValue + 1).toString();
});

// Language button listeners
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const selectedLang = (button as HTMLElement).dataset.lang;
        if (selectedLang) {
          translatePage(selectedLang);
        }
    });
});

resetApp();