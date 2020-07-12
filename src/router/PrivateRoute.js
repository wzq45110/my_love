import React from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Boolean(sessionStorage.getItem("token")) ?
        (
          <Component {...props} />
        )
        : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        )
    }
  />
);
export {
  PrivateRoute
}
// @connect((state) => ({ isLogin: Boolean(sessionStorage.getItem("token")) }))
// class PrivateRoute extends Component {
//   render() {
//     const { isLogin, component: Component, ...rest } = this.props;
//     ///Route组件里render和Component二选一
//     return (
//       <Route
//         {...rest}
//         //props 包含值：history，location，match
//         //login 页面可以通过 this.props.location.state.from知道是哪个页面跳转过来的,方便登录后直接跳转
//         render={(props) =>
//           isLogin ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location.pathname },
//               }}
//             />
//           )
//         }
//       />
//     );
//   }
// }
// export default PrivateRoute;
