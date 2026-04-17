const fs = require("fs");
const path = require("path");

const rawDataPath = path.join(__dirname, "raw_data.txt");
const reportPath = path.join(__dirname, "report.txt");

// 第三步：读取原始数据文件
fs.readFile(rawDataPath, (err, data) => {
  if (err) {
    console.error("❌ 读取原始文件失败：", err);
    return;
  }
  const rawContent = data.toString("utf8").trim();

  const studentScoreList = rawContent.split(",");
  const formatResult = [];
  for (const item of studentScoreList) {
    const [name, subject, scoreStr] = item.split("=");
    const score = Number(scoreStr);

    let evaluationTag;
    if (score >= 90) {
      evaluationTag = "[⭐ 优秀]";
    } else if (score >= 60) {
      evaluationTag = "[✅ 合格]";
    } else {
      evaluationTag = "[❌ 不及格]";
    }
    const formatLine = `${evaluationTag} ${name} - ${subject}: ${score}`;
    formatResult.push(formatLine);
  }

  const finalReport = formatResult.join("\n");

  fs.writeFile(reportPath, finalReport, (err) => {
    if (err) {
      console.error("❌ 生成报告失败：", err);
      return;
    }
    console.log("✅ 家长报告生成成功！文件路径：", reportPath);
  });
});
