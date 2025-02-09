export const trainingData = [
  { query: 'invest', response: 'Investing wisely involves diversifying your portfolio across stocks, bonds, and other assets to minimize risk and maximize returns.' },
  { query: 'saving', response: 'A strong savings strategy includes setting aside at least 20% of your income, building an emergency fund, and leveraging high-yield savings accounts.' },
  { query: 'budgeting', response: 'Creating a budget involves tracking income and expenses, categorizing spending, and setting financial goals to ensure responsible money management.' },
  { query: 'retirement', response: 'Start saving early for retirement through tax-advantaged accounts like 401(k)s and IRAs, and consider index funds for long-term growth.' },
  { query: 'stock', response: 'Stocks represent ownership in a company. Investing in them provides growth potential but comes with market volatility risks.' },
  { query: 'bond', response: 'Bonds are fixed-income securities that offer stable returns. Government and corporate bonds can provide a balance to a stock-heavy portfolio.' },
  { query: 'mutual fund', response: 'Mutual funds pool money from multiple investors to invest in a diversified portfolio, managed by professionals.' },
  { query: 'ETF', response: 'Exchange-Traded Funds (ETFs) are investment funds that trade on stock exchanges like individual stocks, offering diversification and liquidity.' },
  { query: 'real estate', response: 'Real estate investing involves purchasing properties for rental income or appreciation, often requiring long-term capital commitment.' },
  { query: 'tax', response: 'Effective tax planning includes maximizing deductions, using tax-advantaged investment accounts, and planning for capital gains strategies.' },
  { query: 'emergency fund', response: 'An emergency fund should cover 3-6 months of living expenses and be kept in a liquid, easily accessible account.' },
  { query: 'credit score', response: 'Your credit score is affected by payment history, credit utilization, account age, and inquiries. Maintaining a high score helps with loan approvals and interest rates.' },
  { query: 'debt', response: 'Managing debt effectively includes prioritizing high-interest debts, consolidating loans if necessary, and making timely payments to improve credit health.' },
  { query: 'inflation', response: 'Inflation erodes purchasing power over time, making it important to invest in assets that outpace inflation, such as stocks and real estate.' },
  { query: 'retirement account', response: 'Popular retirement accounts include 401(k), IRA, and Roth IRA, each offering unique tax benefits and contribution limits.' },
  { query: 'financial independence', response: 'Financial independence means having enough assets and passive income to cover living expenses without relying on active employment.' },
  { query: 'diversify', response: 'Diversification spreads investments across different asset classes to reduce risk and improve portfolio stability.' },
  { query: 'compound interest', response: 'Compound interest allows your money to grow exponentially over time by earning interest on both the principal and accumulated interest.' },
  { query: 'passive income', response: 'Passive income sources include rental properties, dividend stocks, and online businesses that generate revenue with minimal active involvement.' },
  { query: 'alternative investment', response: 'Alternative investments include assets like cryptocurrency, commodities, and hedge funds, which can provide portfolio diversification.' },
  { query: 'financial planning', response: 'Financial planning involves setting goals, creating a budget, saving for the future, and investing strategically to achieve financial security.' },
  { query: '401k', response: 'A 401(k) is employer-sponsored with higher contribution limits, while an IRA is individually managed with more investment flexibility.' },
  { query: 'high-yield savings', response: 'High-yield savings accounts offer better interest rates than traditional accounts, making them ideal for emergency funds.' },
  { query: 'crypto', response: 'Cryptocurrency investments are highly volatile but can offer high returns. Due diligence and portfolio diversification are crucial.' },
  { query: 'financial literacy', response: 'Financial literacy involves understanding budgeting, investing, credit management, and economic principles to make informed money decisions.' },
  { query: 'estate planning', response: 'Estate planning ensures your assets are distributed according to your wishes and may include wills, trusts, and beneficiary designations.' },
  { query: 'early retirement', response: 'Early retirement requires aggressive savings, high investment returns, and minimizing unnecessary expenses to reach financial independence sooner.' },
  { query: 'market strategy', response: 'Popular stock market strategies include value investing, growth investing, and dollar-cost averaging to manage risk and maximize gains.' },
  { query: 'risk tolerance', response: 'Risk tolerance depends on factors like age, financial goals, and market experience. Higher risk can yield higher potential returns.' },
  { query: 'index fund', response: 'Index funds track market indices like the S&P 500, offering broad diversification and low fees, making them ideal for long-term investing.' },
  { query: 'dividend stock', response: 'Dividend stocks provide regular payouts to investors and can be a great source of passive income while also offering capital appreciation.' },
  { query: 'hedge fund', response: 'Hedge funds use complex strategies to generate high returns for accredited investors but often have high fees and risks.' },
  { query: 'gold', response: 'Gold is a hedge against inflation and economic downturns, often used as a safe-haven asset in times of market instability.' },
  { query: 'loan refinance', response: 'Refinancing a loan can reduce interest rates and monthly payments, but costs and terms should be carefully evaluated.' },
  { query: 'student loan', response: 'Managing student loans effectively involves making extra payments, consolidating loans, and exploring forgiveness programs.' },
  { query: 'insurance', response: 'Insurance, such as health, life, and property insurance, helps protect against financial risks and unexpected events.' },
  { query: 'financial mistake', response: 'Common financial mistakes include overspending, not saving early, neglecting investments, and carrying high-interest debt.' },
  { query: 'recession', response: 'During a recession, focus on increasing savings, reducing discretionary expenses, and investing in recession-resistant assets.' },
  { query: 'side hustle', response: 'A side hustle can provide additional income streams, helping with debt repayment, savings, or investment growth.' },
  { query: 'market trend', response: 'Analyzing market trends helps investors make informed decisions based on economic conditions, interest rates, and corporate earnings.' },
];


export const getBotResponse = (userInput: string): string => {
  for (let item of trainingData) {
    if (userInput.toLowerCase().includes(item.query.toLowerCase())) {
      return item.response;
    }
  }
  return "I'm still learning. Please ask another question!";
};
