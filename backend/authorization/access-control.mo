import Prim "mo:prim";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
import List "mo:base/List";

module AccessControl {
  // Role definitions
  public type Role = {
    #admin;
    #farmer;
    #dealer;
    #integrator;
    #doctor;
    #inspector;
    #guest;
  };

  // Permission types
  public type Permission = {
    #read;
    #write;
    #delete;
    #approve;
    #manage_users;
    #manage_payments;
    #view_reports;
  };

  // User record structure
  public type User = {
    principal : Principal;
    role : Role;
    permissions : [Permission];
    createdAt : Int;
    lastActivity : Int;
    isActive : Bool;
    metadata : [(Text, Text)];
  };

  // Access Control State
  public type AccessControlState = {
    var users : HashMap.HashMap<Principal, User>;
    var rolePermissions : HashMap.HashMap<Text, [Permission]>;
    var adminPrincipals : [Principal];
  };

  // Create new access control state
  public func createState() : AccessControlState {
    return {
      var users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
      var rolePermissions = HashMap.HashMap<Text, [Permission]>(0, Text.equal, Text.hash);
      var adminPrincipals = [];
    };
  };

  // Initialize default role permissions
  public func initializeRolePermissions(
    state : AccessControlState
  ) : () {
    state.rolePermissions.put("admin", [
      #read, #write, #delete, #approve, #manage_users, #manage_payments, #view_reports
    ]);
    state.rolePermissions.put("farmer", [
      #read, #write, #view_reports
    ]);
    state.rolePermissions.put("dealer", [
      #read, #write, #manage_payments, #view_reports
    ]);
    state.rolePermissions.put("integrator", [
      #read, #write, #view_reports, #manage_users
    ]);
    state.rolePermissions.put("doctor", [
      #read, #write, #approve, #view_reports
    ]);
    state.rolePermissions.put("inspector", [
      #read, #view_reports
    ]);
    state.rolePermissions.put("guest", [
      #read
    ]);
  };

  // Check if user has permission
  public func hasPermission(
    user : User,
    permission : Permission
  ) : Bool {
    Array.find<Permission>(user.permissions, func(p) { p == permission }) != null
  };

  // Check if user has role
  public func hasRole(
    user : User,
    requiredRole : Role
  ) : Bool {
    user.role == requiredRole
  };

  // Assign role to user
  public func assignRole(
    state : AccessControlState,
    principal : Principal,
    role : Role,
    caller : Principal
  ) : Result.Result<User, Text> {
    // Check if caller is admin
    switch (state.users.get(caller)) {
      case (null) { return #err("Caller not found") };
      case (?callerUser) {
        if (not hasRole(callerUser, #admin)) {
          return #err("Only admins can assign roles")
        };
      };
    };

    let roleText = roleToText(role);
    let permissions = switch (state.rolePermissions.get(roleText)) {
      case (null) { [] };
      case (?perms) { perms };
    };

    let now = Prim.time();
    let user : User = {
      principal = principal;
      role = role;
      permissions = permissions;
      createdAt = now;
      lastActivity = now;
      isActive = true;
      metadata = [];
    };

    state.users.put(principal, user);
    #ok(user)
  };

  // Revoke user access
  public func revokeAccess(
    state : AccessControlState,
    principal : Principal,
    caller : Principal
  ) : Result.Result<Bool, Text> {
    // Check if caller is admin
    switch (state.users.get(caller)) {
      case (null) { return #err("Caller not found") };
      case (?callerUser) {
        if (not hasRole(callerUser, #admin)) {
          return #err("Only admins can revoke access")
        };
      };
    };

    state.users.remove(principal);
    #ok(true)
  };

  // Helper to convert role to text
  func roleToText(role : Role) : Text {
    switch (role) {
      case (#admin) { "admin" };
      case (#farmer) { "farmer" };
      case (#dealer) { "dealer" };
      case (#integrator) { "integrator" };
      case (#doctor) { "doctor" };
      case (#inspector) { "inspector" };
      case (#guest) { "guest" };
    }
  };

  // Get user by principal
  public func getUser(
    state : AccessControlState,
    principal : Principal
  ) : ?User {
    state.users.get(principal)
  };

  // Update last activity
  public func updateActivity(
    state : AccessControlState,
    principal : Principal
  ) : () {
    switch (state.users.get(principal)) {
      case (null) { () };
      case (?user) {
        let updatedUser = { user with lastActivity = Prim.time() };
        state.users.put(principal, updatedUser);
      };
    };
  };
};
