
#!/bin/bash

# 提示使用者輸入起始值和結束值
read -p "請輸入起始值：" start
read -p "請輸入結束值：" end

# 檢查輸入值是否為數字
if ! [[ "$start" =~ ^[0-9]+$ ]] || ! [[ "$end" =~ ^[0-9]+$ ]]; then
  echo "請輸入有效的數字。"
  exit 1
fi

# 檢查起始值是否小於等於結束值
if [ "$start" -gt "$end" ]; then
  echo "起始值應小於或等於結束值。"
  exit 1
fi

# 創建對應數量的 .md 文件
for ((i=start; i<=end; i++)); do
  touch "$i.md"
done

echo "已成功創建 $(($end - $start + 1)) 個 .md 文件。"
