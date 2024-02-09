// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

const agentNavConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "GENERAL",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.mystats,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "",
    items: [
      // {
      //   title: "services",
      //   path: PATH_DASHBOARD.services,
      //   icon: ICONS.ecommerce,
      // },

      {
        title: "Services",
        path: PATH_DASHBOARD.service.root,
        icon: ICONS.user,
        children: [
          {
            title: "Recharge",
            path: PATH_DASHBOARD.service.recharge,
          },
          {
            title: "Money Transfer",
            path: PATH_DASHBOARD.service.dmt,
          },
          {
            title: "DMT2",
            path: PATH_DASHBOARD.service.dmt2,
          },
          {
            title: "AEPS",
            path: PATH_DASHBOARD.service.aeps,
          },
          {
            title: "Bill Payment",
            path: PATH_DASHBOARD.service.billpayment,
          },
          {
            title: "Aadhaary Pay",
            path: PATH_DASHBOARD.service.aadhaarpay,
          },
        ],
      },

      {
        title: "Transactions",
        path: PATH_DASHBOARD.transaction.root,
        icon: ICONS.user,
        children: [
          {
            title: "My Transactions",
            path: PATH_DASHBOARD.transaction.mytransaction,
          },
          {
            title: "Fund Flow",
            path: PATH_DASHBOARD.transaction.fundflow,
          },
          {
            title: "Wallet Ladger",
            path: PATH_DASHBOARD.transaction.walletladger,
          },
        ],
      },
      {
        title: "Schemes",
        path: PATH_DASHBOARD.scheme.root,
        icon: ICONS.user,
        children: [
          {
            title: "All Scheme",
            path: PATH_DASHBOARD.scheme.allscheme,
          },
          {
            title: "BBPS Scheme",
            path: PATH_DASHBOARD.scheme.bbpsscheme,
          },
        ],
      },
      {
        title: "Fund Management",
        path: PATH_DASHBOARD.fundmanagement.root,
        icon: ICONS.user,
        children: [
          {
            title: "My Fund Deposits",
            path: PATH_DASHBOARD.fundmanagement.myfunddeposits,
          },
          {
            title: "AEPS settlement",
            path: PATH_DASHBOARD.fundmanagement.aepssettlement,
          },
          {
            title: "Bank Accounts",
            path: PATH_DASHBOARD.fundmanagement.mybankaccount,
          },
          {
            title: "My Fund Requests",
            path: PATH_DASHBOARD.fundmanagement.myfundrequest,
          },
        ],
      },
      {
        title: "Setting",
        path: PATH_DASHBOARD.setting,
        icon: ICONS.ecommerce,
      },
      {
        title: "Help & Support",
        path: PATH_DASHBOARD.helpsupport,
        icon: ICONS.ecommerce,
      },
    ],
  },
];

export default agentNavConfig;
