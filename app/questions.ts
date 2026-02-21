export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface DSAQuestion {
    id: number;
    title: string;
    topic: string;
    difficulty: Difficulty;
    logic: string;
    tc: string;
    sc: string;
    tip: string;
    cpp: string;
    java: string;
}

export const topics = ['All', 'Array', 'String', 'Linked List', 'Tree', 'Graph', 'DP', 'Stack/Queue', 'Binary Search', 'Greedy', 'Math'];

export const questions: DSAQuestion[] = [
    // ── ARRAYS ────────────────────────────────────────────────────────────────────
    {
        id: 1, topic: 'Array', difficulty: 'Easy',
        title: 'Two Sum',
        logic: 'Use a hash map to store complement of each number. One pass O(n).',
        tc: 'O(n)', sc: 'O(n)',
        tip: 'Key insight: store value→index in map, check if target-num exists.',
        cpp: `unordered_map<int,int> mp;
for(int i=0;i<n;i++){
  int rem=target-nums[i];
  if(mp.count(rem)) return {mp[rem],i};
  mp[nums[i]]=i;
}`,
        java: `Map<Integer,Integer> map=new HashMap<>();
for(int i=0;i<nums.length;i++){
  int rem=target-nums[i];
  if(map.containsKey(rem)) return new int[]{map.get(rem),i};
  map.put(nums[i],i);
}`
    },
    {
        id: 2, topic: 'Array', difficulty: 'Medium',
        title: 'Best Time to Buy and Sell Stock',
        logic: 'Track min price seen so far; update max profit at each step.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'One pass: minPrice=INT_MAX, profit=max(profit, price-minPrice).',
        cpp: `int minP=INT_MAX,ans=0;
for(int p:prices){ minP=min(minP,p); ans=max(ans,p-minP); }
return ans;`,
        java: `int minP=Integer.MAX_VALUE,ans=0;
for(int p:prices){ minP=Math.min(minP,p); ans=Math.max(ans,p-minP); }
return ans;`
    },
    {
        id: 3, topic: 'Array', difficulty: 'Medium',
        title: 'Maximum Subarray (Kadane\'s)',
        logic: 'Extend subarray if adding element increases sum, else restart.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'curr=max(num, curr+num); ans=max(ans,curr) — classic Kadane\'s.',
        cpp: `int cur=nums[0],ans=nums[0];
for(int i=1;i<n;i++){ cur=max(nums[i],cur+nums[i]); ans=max(ans,cur); }
return ans;`,
        java: `int cur=nums[0],ans=nums[0];
for(int i=1;i<nums.length;i++){ cur=Math.max(nums[i],cur+nums[i]); ans=Math.max(ans,cur); }
return ans;`
    },
    {
        id: 4, topic: 'Array', difficulty: 'Medium',
        title: 'Container With Most Water',
        logic: 'Two pointers from both ends. Move the shorter side inward.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'area=min(h[l],h[r])*(r-l); always move the smaller height pointer.',
        cpp: `int l=0,r=n-1,ans=0;
while(l<r){ ans=max(ans,min(h[l],h[r])*(r-l)); h[l]<h[r]?l++:r--; }
return ans;`,
        java: `int l=0,r=h.length-1,ans=0;
while(l<r){ ans=Math.max(ans,Math.min(h[l],h[r])*(r-l)); if(h[l]<h[r])l++; else r--; }
return ans;`
    },
    {
        id: 5, topic: 'Array', difficulty: 'Medium',
        title: 'Product of Array Except Self',
        logic: 'Left pass stores prefix products; right pass multiplies suffix.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'No division needed: ans[i]=left_product * right_product.',
        cpp: `vector<int> ans(n,1); int left=1,right=1;
for(int i=0;i<n;i++){ans[i]*=left;left*=nums[i];}
for(int i=n-1;i>=0;i--){ans[i]*=right;right*=nums[i];}
return ans;`,
        java: `int[] ans=new int[n]; Arrays.fill(ans,1); int l=1,r=1;
for(int i=0;i<n;i++){ans[i]*=l;l*=nums[i];}
for(int i=n-1;i>=0;i--){ans[i]*=r;r*=nums[i];}
return ans;`
    },
    {
        id: 6, topic: 'Array', difficulty: 'Hard',
        title: 'Trapping Rain Water',
        logic: 'Two pointers: maintain leftMax and rightMax; water=min(lMax,rMax)-h.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'Move pointer with smaller max; water trapped = min of both maxes - current height.',
        cpp: `int l=0,r=n-1,lm=0,rm=0,ans=0;
while(l<r){ lm=max(lm,h[l]); rm=max(rm,h[r]);
  ans+=(lm<rm)?lm-h[l++]:rm-h[r--]; }
return ans;`,
        java: `int l=0,r=h.length-1,lm=0,rm=0,ans=0;
while(l<r){ lm=Math.max(lm,h[l]); rm=Math.max(rm,h[r]);
  if(lm<rm)ans+=lm-h[l++]; else ans+=rm-h[r--]; }
return ans;`
    },
    {
        id: 7, topic: 'Array', difficulty: 'Medium',
        title: '3Sum',
        logic: 'Sort, fix one element, use two pointers for the pair.',
        tc: 'O(n²)', sc: 'O(1)',
        tip: 'Sort first. Skip duplicates. For each i, two-pointer from i+1 to end.',
        cpp: `sort(nums.begin(),nums.end()); vector<vector<int>> res;
for(int i=0;i<n-2;i++){ if(i&&nums[i]==nums[i-1])continue;
  int l=i+1,r=n-1;
  while(l<r){ int s=nums[i]+nums[l]+nums[r];
    if(!s){res.push_back({nums[i],nums[l++],nums[r--]});}
    else if(s<0)l++; else r--; } }`,
        java: `Arrays.sort(nums); List<List<Integer>> res=new ArrayList<>();
for(int i=0;i<nums.length-2;i++){ if(i>0&&nums[i]==nums[i-1])continue;
  int l=i+1,r=nums.length-1;
  while(l<r){ int s=nums[i]+nums[l]+nums[r];
    if(s==0)res.add(Arrays.asList(nums[i],nums[l++],nums[r--]));
    else if(s<0)l++; else r--; } }`
    },
    {
        id: 8, topic: 'Array', difficulty: 'Medium',
        title: 'Find Minimum in Rotated Sorted Array',
        logic: 'Binary search: if mid > right, minimum is in right half.',
        tc: 'O(log n)', sc: 'O(1)',
        tip: 'Compare nums[mid] with nums[right]; min is always on the unsorted side.',
        cpp: `int l=0,r=n-1;
while(l<r){ int m=(l+r)/2; if(nums[m]>nums[r])l=m+1; else r=m; }
return nums[l];`,
        java: `int l=0,r=nums.length-1;
while(l<r){ int m=(l+r)/2; if(nums[m]>nums[r])l=m+1; else r=m; }
return nums[l];`
    },
    // ── STRINGS ───────────────────────────────────────────────────────────────────
    {
        id: 9, topic: 'String', difficulty: 'Easy',
        title: 'Valid Palindrome',
        logic: 'Two pointers from ends. Skip non-alphanumeric. Compare lowercased.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'isalnum() + tolower(); skip non-alnum with l++ or r--.',
        cpp: `int l=0,r=s.size()-1;
while(l<r){ while(l<r&&!isalnum(s[l]))l++;
  while(l<r&&!isalnum(s[r]))r--;
  if(tolower(s[l++])!=tolower(s[r--]))return false; }
return true;`,
        java: `int l=0,r=s.length()-1;
while(l<r){ while(l<r&&!Character.isLetterOrDigit(s.charAt(l)))l++;
  while(l<r&&!Character.isLetterOrDigit(s.charAt(r)))r--;
  if(Character.toLowerCase(s.charAt(l++))!=Character.toLowerCase(s.charAt(r--)))return false; }
return true;`
    },
    {
        id: 10, topic: 'String', difficulty: 'Medium',
        title: 'Longest Substring Without Repeating Characters',
        logic: 'Sliding window with a set. Shrink left when duplicate found.',
        tc: 'O(n)', sc: 'O(min(m,n))',
        tip: 'Use map<char,index> to jump left pointer directly past duplicate.',
        cpp: `unordered_map<char,int> mp; int l=0,ans=0;
for(int r=0;r<n;r++){ if(mp.count(s[r]))l=max(l,mp[s[r]]+1);
  mp[s[r]]=r; ans=max(ans,r-l+1); }
return ans;`,
        java: `Map<Character,Integer> map=new HashMap<>(); int l=0,ans=0;
for(int r=0;r<s.length();r++){ if(map.containsKey(s.charAt(r)))l=Math.max(l,map.get(s.charAt(r))+1);
  map.put(s.charAt(r),r); ans=Math.max(ans,r-l+1); }
return ans;`
    },
    {
        id: 11, topic: 'String', difficulty: 'Medium',
        title: 'Longest Palindromic Substring',
        logic: 'Expand around center for each character (odd & even length).',
        tc: 'O(n²)', sc: 'O(1)',
        tip: 'For each index, expand both odd (i,i) and even (i,i+1) centers.',
        cpp: `int st=0,maxLen=1;
auto expand=[&](int l,int r){ while(l>=0&&r<n&&s[l]==s[r])l--,r++;
  if(r-l-1>maxLen){maxLen=r-l-1;st=l+1;} };
for(int i=0;i<n;i++){expand(i,i);expand(i,i+1);}
return s.substr(st,maxLen);`,
        java: `int st=0,mx=1;
for(int i=0;i<s.length();i++){
  for(int[] r:{new int[]{i,i},new int[]{i,i+1}}){
    int l2=r[0],r2=r[1];
    while(l2>=0&&r2<s.length()&&s.charAt(l2)==s.charAt(r2)){l2--;r2++;}
    if(r2-l2-1>mx){mx=r2-l2-1;st=l2+1;} } }
return s.substring(st,st+mx);`
    },
    {
        id: 12, topic: 'String', difficulty: 'Medium',
        title: 'Group Anagrams',
        logic: 'Sort each word as key in a map; group identical sorted keys.',
        tc: 'O(n·k log k)', sc: 'O(n·k)',
        tip: 'sorted(word) as HashMap key groups all anagrams together.',
        cpp: `unordered_map<string,vector<string>> mp;
for(auto& s:strs){ string k=s; sort(k.begin(),k.end()); mp[k].push_back(s); }
vector<vector<string>> ans;
for(auto& p:mp) ans.push_back(p.second);
return ans;`,
        java: `Map<String,List<String>> map=new HashMap<>();
for(String s:strs){ char[] c=s.toCharArray(); Arrays.sort(c);
  map.computeIfAbsent(new String(c),k->new ArrayList<>()).add(s); }
return new ArrayList<>(map.values());`
    },
    {
        id: 13, topic: 'String', difficulty: 'Hard',
        title: 'Minimum Window Substring',
        logic: 'Sliding window: expand right until all chars covered, shrink left.',
        tc: 'O(n+m)', sc: 'O(m)',
        tip: 'Use need map + have/need counters. Shrink only when have==need.',
        cpp: `unordered_map<char,int> need,win; for(char c:t)need[c]++;
int have=0,req=need.size(),l=0,mn=INT_MAX,st=0;
for(int r=0;r<s.size();r++){ char c=s[r]; win[c]++;
  if(need.count(c)&&win[c]==need[c])have++;
  while(have==req){ if(r-l+1<mn){mn=r-l+1;st=l;}
    win[s[l]]--; if(need.count(s[l])&&win[s[l]]<need[s[l]])have--; l++; } }
return mn==INT_MAX?"":s.substr(st,mn);`,
        java: `Map<Character,Integer> need=new HashMap<>(),win=new HashMap<>();
for(char c:t.toCharArray())need.merge(c,1,Integer::sum);
int have=0,req=need.size(),l=0,mn=Integer.MAX_VALUE,st=0;
for(int r=0;r<s.length();r++){ char c=s.charAt(r); win.merge(c,1,Integer::sum);
  if(need.containsKey(c)&&win.get(c).equals(need.get(c)))have++;
  while(have==req){ if(r-l+1<mn){mn=r-l+1;st=l;}
    char lc=s.charAt(l); win.merge(lc,-1,Integer::sum);
    if(need.containsKey(lc)&&win.get(lc)<need.get(lc))have--; l++; } }
return mn==Integer.MAX_VALUE?"":s.substring(st,st+mn);`
    },
    // ── LINKED LIST ───────────────────────────────────────────────────────────────
    {
        id: 14, topic: 'Linked List', difficulty: 'Easy',
        title: 'Reverse Linked List',
        logic: 'Iterative: prev=null, cur=head; swap next pointers one by one.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'Three pointers: prev, cur, next. Move forward while reversing arrow.',
        cpp: `ListNode *prev=nullptr,*cur=head;
while(cur){ auto nxt=cur->next; cur->next=prev; prev=cur; cur=nxt; }
return prev;`,
        java: `ListNode prev=null,cur=head;
while(cur!=null){ ListNode nxt=cur.next; cur.next=prev; prev=cur; cur=nxt; }
return prev;`
    },
    {
        id: 15, topic: 'Linked List', difficulty: 'Easy',
        title: 'Detect Cycle in Linked List',
        logic: 'Floyd\'s slow/fast pointer. If they meet → cycle exists.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'slow=head.next, fast=head.next.next; if slow==fast → cycle.',
        cpp: `auto slow=head,fast=head;
while(fast&&fast->next){ slow=slow->next; fast=fast->next->next;
  if(slow==fast)return true; }
return false;`,
        java: `ListNode slow=head,fast=head;
while(fast!=null&&fast.next!=null){ slow=slow.next; fast=fast.next.next;
  if(slow==fast)return true; }
return false;`
    },
    {
        id: 16, topic: 'Linked List', difficulty: 'Medium',
        title: 'Merge Two Sorted Lists',
        logic: 'Compare heads, attach smaller node, recurse/iterate.',
        tc: 'O(n+m)', sc: 'O(1)',
        tip: 'Use dummy head; always point next to smaller node.',
        cpp: `ListNode dummy(0),*cur=&dummy;
while(l1&&l2){ if(l1->val<=l2->val){cur->next=l1;l1=l1->next;}
  else{cur->next=l2;l2=l2->next;} cur=cur->next; }
cur->next=l1?l1:l2; return dummy.next;`,
        java: `ListNode dummy=new ListNode(0),cur=dummy;
while(l1!=null&&l2!=null){ if(l1.val<=l2.val){cur.next=l1;l1=l1.next;}
  else{cur.next=l2;l2=l2.next;} cur=cur.next; }
cur.next=l1!=null?l1:l2; return dummy.next;`
    },
    {
        id: 17, topic: 'Linked List', difficulty: 'Medium',
        title: 'Find Middle of Linked List',
        logic: 'Slow/fast pointers. When fast reaches end, slow is at middle.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'fast=head.next for upper-middle; fast=head for lower-middle.',
        cpp: `auto slow=head,fast=head;
while(fast&&fast->next){ slow=slow->next; fast=fast->next->next; }
return slow;`,
        java: `ListNode slow=head,fast=head;
while(fast!=null&&fast.next!=null){ slow=slow.next; fast=fast.next.next; }
return slow;`
    },
    {
        id: 18, topic: 'Linked List', difficulty: 'Hard',
        title: 'Merge K Sorted Lists',
        logic: 'Use a min-heap of size k. Poll min, push its next node.',
        tc: 'O(n log k)', sc: 'O(k)',
        tip: 'PriorityQueue on ListNode; always extract global min in O(log k).',
        cpp: `priority_queue<pair<int,ListNode*>,vector<pair<int,ListNode*>>,greater<>> pq;
for(auto l:lists) if(l) pq.push({l->val,l});
ListNode dummy(0),*cur=&dummy;
while(!pq.empty()){ auto [v,node]=pq.top(); pq.pop();
  cur->next=node; cur=cur->next;
  if(node->next) pq.push({node->next->val,node->next}); }
return dummy.next;`,
        java: `PriorityQueue<ListNode> pq=new PriorityQueue<>((a,b)->a.val-b.val);
for(ListNode l:lists) if(l!=null)pq.add(l);
ListNode dummy=new ListNode(0),cur=dummy;
while(!pq.isEmpty()){ cur.next=pq.poll(); cur=cur.next;
  if(cur.next!=null)pq.add(cur.next); }
return dummy.next;`
    },
    // ── TREES ─────────────────────────────────────────────────────────────────────
    {
        id: 19, topic: 'Tree', difficulty: 'Easy',
        title: 'Maximum Depth of Binary Tree',
        logic: 'DFS: depth = 1 + max(left depth, right depth).',
        tc: 'O(n)', sc: 'O(h)',
        tip: 'return root? 1+max(maxDepth(root->left), maxDepth(root->right)) : 0',
        cpp: `int maxDepth(TreeNode* r){ return r?1+max(maxDepth(r->left),maxDepth(r->right)):0; }`,
        java: `public int maxDepth(TreeNode r){ return r==null?0:1+Math.max(maxDepth(r.left),maxDepth(r.right)); }`
    },
    {
        id: 20, topic: 'Tree', difficulty: 'Easy',
        title: 'Invert Binary Tree',
        logic: 'Swap left and right children recursively at every node.',
        tc: 'O(n)', sc: 'O(h)',
        tip: 'swap(node->left, node->right) then recurse both sides.',
        cpp: `TreeNode* invertTree(TreeNode* r){
  if(!r)return nullptr;
  swap(r->left,r->right);
  invertTree(r->left); invertTree(r->right);
  return r; }`,
        java: `public TreeNode invertTree(TreeNode r){
  if(r==null)return null;
  TreeNode tmp=r.left; r.left=r.right; r.right=tmp;
  invertTree(r.left); invertTree(r.right); return r; }`
    },
    {
        id: 21, topic: 'Tree', difficulty: 'Easy',
        title: 'Validate Binary Search Tree',
        logic: 'Pass min/max bounds; each node must be strictly within range.',
        tc: 'O(n)', sc: 'O(h)',
        tip: 'validate(node, min, max): left → (min, node.val), right → (node.val, max).',
        cpp: `bool valid(TreeNode* r,long mn,long mx){
  if(!r)return true;
  if(r->val<=mn||r->val>=mx)return false;
  return valid(r->left,mn,r->val)&&valid(r->right,r->val,mx); }
bool isValidBST(TreeNode* r){return valid(r,LONG_MIN,LONG_MAX);}`,
        java: `boolean valid(TreeNode r,long mn,long mx){
  if(r==null)return true;
  if(r.val<=mn||r.val>=mx)return false;
  return valid(r.left,mn,r.val)&&valid(r.right,r.val,mx); }
public boolean isValidBST(TreeNode r){return valid(r,Long.MIN_VALUE,Long.MAX_VALUE);}`
    },
    {
        id: 22, topic: 'Tree', difficulty: 'Medium',
        title: 'Level Order Traversal (BFS)',
        logic: 'BFS with queue; process all nodes at each level before moving next.',
        tc: 'O(n)', sc: 'O(n)',
        tip: 'At each level, snapshot queue.size() first; loop exactly that many times.',
        cpp: `vector<vector<int>> res; if(!root)return res;
queue<TreeNode*> q; q.push(root);
while(!q.empty()){ int sz=q.size(); vector<int> lv;
  for(int i=0;i<sz;i++){ auto n=q.front();q.pop(); lv.push_back(n->val);
    if(n->left)q.push(n->left); if(n->right)q.push(n->right); }
  res.push_back(lv); }
return res;`,
        java: `List<List<Integer>> res=new ArrayList<>(); if(root==null)return res;
Queue<TreeNode> q=new LinkedList<>(); q.add(root);
while(!q.isEmpty()){ int sz=q.size(); List<Integer> lv=new ArrayList<>();
  for(int i=0;i<sz;i++){ TreeNode n=q.poll(); lv.add(n.val);
    if(n.left!=null)q.add(n.left); if(n.right!=null)q.add(n.right); }
  res.add(lv); }
return res;`
    },
    {
        id: 23, topic: 'Tree', difficulty: 'Medium',
        title: 'Lowest Common Ancestor of BST',
        logic: 'If both p,q < root → go left. If both > root → go right. Else root is LCA.',
        tc: 'O(h)', sc: 'O(1)',
        tip: 'BST property: no recursion with bounds needed, just compare values.',
        cpp: `while(root){ if(p->val<root->val&&q->val<root->val)root=root->left;
  else if(p->val>root->val&&q->val>root->val)root=root->right;
  else return root; }
return nullptr;`,
        java: `while(root!=null){ if(p.val<root.val&&q.val<root.val)root=root.left;
  else if(p.val>root.val&&q.val>root.val)root=root.right;
  else return root; }
return null;`
    },
    {
        id: 24, topic: 'Tree', difficulty: 'Hard',
        title: 'Binary Tree Maximum Path Sum',
        logic: 'DFS returns max gain from node. Track global max including both branches.',
        tc: 'O(n)', sc: 'O(h)',
        tip: 'gain(node)=node.val+max(0,gain(left))+max(0,gain(right)) for global; return only one branch.',
        cpp: `int ans=INT_MIN;
function<int(TreeNode*)> dfs=[&](TreeNode* r)->int{
  if(!r)return 0;
  int l=max(0,dfs(r->left)),ri=max(0,dfs(r->right));
  ans=max(ans,r->val+l+ri); return r->val+max(l,ri); };
dfs(root); return ans;`,
        java: `int[] ans={Integer.MIN_VALUE};
dfs(root,ans); return ans[0];
// helper:
int dfs(TreeNode r,int[] ans){
  if(r==null)return 0;
  int l=Math.max(0,dfs(r.left,ans)),ri=Math.max(0,dfs(r.right,ans));
  ans[0]=Math.max(ans[0],r.val+l+ri); return r.val+Math.max(l,ri); }`
    },
    // ── DYNAMIC PROGRAMMING ───────────────────────────────────────────────────────
    {
        id: 25, topic: 'DP', difficulty: 'Easy',
        title: 'Climbing Stairs',
        logic: 'dp[i] = dp[i-1] + dp[i-2]. Same as Fibonacci.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'Only two previous states needed: a,b = b, a+b.',
        cpp: `int a=1,b=1;
for(int i=2;i<=n;i++){int c=a+b;a=b;b=c;}
return b;`,
        java: `int a=1,b=1;
for(int i=2;i<=n;i++){int c=a+b;a=b;b=c;}
return b;`
    },
    {
        id: 26, topic: 'DP', difficulty: 'Medium',
        title: 'Coin Change',
        logic: 'BFS/DP: dp[i]=min coins for amount i. Try each coin.',
        tc: 'O(n·coins)', sc: 'O(n)',
        tip: 'dp[0]=0; dp[i]=min(dp[i], dp[i-coin]+1) for all valid coins.',
        cpp: `vector<int> dp(amount+1,INT_MAX); dp[0]=0;
for(int i=1;i<=amount;i++) for(int c:coins)
  if(c<=i&&dp[i-c]!=INT_MAX) dp[i]=min(dp[i],dp[i-c]+1);
return dp[amount]==INT_MAX?-1:dp[amount];`,
        java: `int[] dp=new int[amount+1]; Arrays.fill(dp,amount+1); dp[0]=0;
for(int i=1;i<=amount;i++) for(int c:coins)
  if(c<=i) dp[i]=Math.min(dp[i],dp[i-c]+1);
return dp[amount]>amount?-1:dp[amount];`
    },
    {
        id: 27, topic: 'DP', difficulty: 'Medium',
        title: 'Longest Common Subsequence',
        logic: 'If chars match: dp[i][j]=1+dp[i-1][j-1]; else max of skip either.',
        tc: 'O(m·n)', sc: 'O(m·n)',
        tip: 'dp[i][j]: LCS of s1[0..i-1] and s2[0..j-1]. Final answer: dp[m][n].',
        cpp: `vector<vector<int>> dp(m+1,vector<int>(n+1,0));
for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
  dp[i][j]=(s1[i-1]==s2[j-1])?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1]);
return dp[m][n];`,
        java: `int[][] dp=new int[m+1][n+1];
for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
  dp[i][j]=s1.charAt(i-1)==s2.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
return dp[m][n];`
    },
    {
        id: 28, topic: 'DP', difficulty: 'Medium',
        title: 'Longest Increasing Subsequence',
        logic: 'Binary search approach: maintain patience-sort array; ans=size.',
        tc: 'O(n log n)', sc: 'O(n)',
        tip: 'tails[]: replace first element >= nums[i] using lower_bound/bisect_left.',
        cpp: `vector<int> tails;
for(int x:nums){ auto it=lower_bound(tails.begin(),tails.end(),x);
  if(it==tails.end())tails.push_back(x); else *it=x; }
return tails.size();`,
        java: `List<Integer> tails=new ArrayList<>();
for(int x:nums){ int pos=Collections.binarySearch(tails,x);
  if(pos<0)pos=-(pos+1);
  if(pos==tails.size())tails.add(x); else tails.set(pos,x); }
return tails.size();`
    },
    {
        id: 29, topic: 'DP', difficulty: 'Medium',
        title: '0/1 Knapsack',
        logic: 'dp[j] = max value for capacity j. Iterate items outer, capacity inner (reverse).',
        tc: 'O(n·W)', sc: 'O(W)',
        tip: 'Reverse inner loop (W to w[i]) to avoid using same item twice.',
        cpp: `vector<int> dp(W+1,0);
for(int i=0;i<n;i++) for(int j=W;j>=w[i];j--)
  dp[j]=max(dp[j],dp[j-w[i]]+v[i]);
return dp[W];`,
        java: `int[] dp=new int[W+1];
for(int i=0;i<n;i++) for(int j=W;j>=w[i];j--)
  dp[j]=Math.max(dp[j],dp[j-w[i]]+v[i]);
return dp[W];`
    },
    {
        id: 30, topic: 'DP', difficulty: 'Hard',
        title: 'Edit Distance',
        logic: 'dp[i][j]=edits to convert s1[0..i] to s2[0..j]. Insert/delete/replace.',
        tc: 'O(m·n)', sc: 'O(m·n)',
        tip: 'Match→dp[i-1][j-1]; else 1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).',
        cpp: `vector<vector<int>> dp(m+1,vector<int>(n+1));
for(int i=0;i<=m;i++) dp[i][0]=i;
for(int j=0;j<=n;j++) dp[0][j]=j;
for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
  dp[i][j]=(s1[i-1]==s2[j-1])?dp[i-1][j-1]:1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
return dp[m][n];`,
        java: `int[][] dp=new int[m+1][n+1];
for(int i=0;i<=m;i++)dp[i][0]=i; for(int j=0;j<=n;j++)dp[0][j]=j;
for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
  dp[i][j]=s1.charAt(i-1)==s2.charAt(j-1)?dp[i-1][j-1]:1+Math.min(dp[i-1][j],Math.min(dp[i][j-1],dp[i-1][j-1]));
return dp[m][n];`
    },
    // ── GRAPHS ────────────────────────────────────────────────────────────────────
    {
        id: 31, topic: 'Graph', difficulty: 'Medium',
        title: 'Number of Islands',
        logic: 'DFS/BFS from each unvisited land cell; mark visited, count components.',
        tc: 'O(m·n)', sc: 'O(m·n)',
        tip: 'Flood-fill: dfs sets grid[r][c]=\'0\' to mark visited. Count dfs calls.',
        cpp: `int ans=0;
function<void(int,int)> dfs=[&](int r,int c){
  if(r<0||r>=m||c<0||c>=n||grid[r][c]!='1')return;
  grid[r][c]='0';
  dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1); };
for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(grid[i][j]=='1'){dfs(i,j);ans++;}
return ans;`,
        java: `int ans=0;
for(int i=0;i<grid.length;i++) for(int j=0;j<grid[0].length;j++)
  if(grid[i][j]=='1'){dfs(grid,i,j);ans++;}
return ans;
// dfs: mark '0', recurse 4 dirs`
    },
    {
        id: 32, topic: 'Graph', difficulty: 'Medium',
        title: 'Clone Graph',
        logic: 'DFS with a HashMap<original, clone>. Clone node then recurse neighbors.',
        tc: 'O(V+E)', sc: 'O(V)',
        tip: 'Map node→clone prevents revisiting. DFS/BFS both work.',
        cpp: `unordered_map<Node*,Node*> mp;
function<Node*(Node*)> clone=[&](Node* n)->Node*{
  if(!n)return nullptr;
  if(mp.count(n))return mp[n];
  mp[n]=new Node(n->val);
  for(auto nb:n->neighbors)mp[n]->neighbors.push_back(clone(nb));
  return mp[n]; };
return clone(node);`,
        java: `Map<Node,Node> map=new HashMap<>();
return dfs(node,map);
// dfs helper:
Node dfs(Node n,Map<Node,Node> map){
  if(n==null)return null;
  if(map.containsKey(n))return map.get(n);
  Node c=new Node(n.val); map.put(n,c);
  for(Node nb:n.neighbors)c.neighbors.add(dfs(nb,map));
  return c; }`
    },
    {
        id: 33, topic: 'Graph', difficulty: 'Medium',
        title: 'Course Schedule (Cycle Detection)',
        logic: 'Topological sort (Kahn\'s or DFS). If cycle exists → impossible.',
        tc: 'O(V+E)', sc: 'O(V+E)',
        tip: 'Track in-degree; if processed nodes < numCourses → cycle exists.',
        cpp: `vector<int> indegree(n,0); vector<vector<int>> adj(n);
for(auto& e:pre){adj[e[1]].push_back(e[0]);indegree[e[0]]++;}
queue<int> q; for(int i=0;i<n;i++) if(!indegree[i])q.push(i);
int cnt=0; while(!q.empty()){ int u=q.front();q.pop();cnt++;
  for(int v:adj[u]) if(--indegree[v]==0)q.push(v); }
return cnt==n;`,
        java: `int[] ind=new int[n]; List<List<Integer>> adj=new ArrayList<>();
for(int i=0;i<n;i++)adj.add(new ArrayList<>());
for(int[] e:pre){adj.get(e[1]).add(e[0]);ind[e[0]]++;}
Queue<Integer> q=new LinkedList<>();
for(int i=0;i<n;i++)if(ind[i]==0)q.add(i);
int cnt=0; while(!q.isEmpty()){ int u=q.poll();cnt++;
  for(int v:adj.get(u))if(--ind[v]==0)q.add(v); }
return cnt==n;`
    },
    // ── STACK / QUEUE ─────────────────────────────────────────────────────────────
    {
        id: 34, topic: 'Stack/Queue', difficulty: 'Easy',
        title: 'Valid Parentheses',
        logic: 'Push open brackets. On close bracket, pop and check match.',
        tc: 'O(n)', sc: 'O(n)',
        tip: 'Use a map: close→open. Stack must end empty.',
        cpp: `stack<char> st;
for(char c:s){ if(c=='('||c=='['||c=='{')st.push(c);
  else{ if(st.empty())return false;
    char t=st.top();st.pop();
    if((c==')'&&t!='(')||(c==']'&&t!='[')||(c=='}'&&t!='{'))return false; } }
return st.empty();`,
        java: `Deque<Character> st=new ArrayDeque<>();
for(char c:s.toCharArray()){ if(c=='('||c=='['||c=='{')st.push(c);
  else{ if(st.isEmpty())return false;
    char t=st.pop();
    if((c==')'&&t!='(')||(c==']'&&t!='[')||(c=='}'&&t!='{'))return false; } }
return st.isEmpty();`
    },
    {
        id: 35, topic: 'Stack/Queue', difficulty: 'Medium',
        title: 'Daily Temperatures',
        logic: 'Monotonic decreasing stack of indices; pop when warmer day found.',
        tc: 'O(n)', sc: 'O(n)',
        tip: 'Stack stores indices. When T[i]>T[stack.top()], ans[top]=i-top.',
        cpp: `vector<int> ans(n,0); stack<int> st;
for(int i=0;i<n;i++){ while(!st.empty()&&T[i]>T[st.top()]){
  ans[st.top()]=i-st.top();st.pop();} st.push(i);}
return ans;`,
        java: `int[] ans=new int[n]; Deque<Integer> st=new ArrayDeque<>();
for(int i=0;i<n;i++){ while(!st.isEmpty()&&T[i]>T[st.peek()]){
  ans[st.peek()]=i-st.pop();} st.push(i);}
return ans;`
    },
    // ── BINARY SEARCH ─────────────────────────────────────────────────────────────
    {
        id: 36, topic: 'Binary Search', difficulty: 'Medium',
        title: 'Search in Rotated Sorted Array',
        logic: 'One half is always sorted; check if target is in sorted half.',
        tc: 'O(log n)', sc: 'O(1)',
        tip: 'Identify which half is sorted, then check if target falls in it.',
        cpp: `int l=0,r=n-1;
while(l<=r){ int m=(l+r)/2; if(nums[m]==target)return m;
  if(nums[l]<=nums[m]){ if(nums[l]<=target&&target<nums[m])r=m-1; else l=m+1;}
  else{ if(nums[m]<target&&target<=nums[r])l=m+1; else r=m-1;} }
return -1;`,
        java: `int l=0,r=nums.length-1;
while(l<=r){ int m=(l+r)/2; if(nums[m]==target)return m;
  if(nums[l]<=nums[m]){ if(nums[l]<=target&&target<nums[m])r=m-1; else l=m+1;}
  else{ if(nums[m]<target&&target<=nums[r])l=m+1; else r=m-1;} }
return -1;`
    },
    {
        id: 37, topic: 'Binary Search', difficulty: 'Hard',
        title: 'Median of Two Sorted Arrays',
        logic: 'Binary search on smaller array to find correct partition.',
        tc: 'O(log(min(m,n)))', sc: 'O(1)',
        tip: 'Partition both arrays so max(left) ≤ min(right); binary search the partition.',
        cpp: `if(m>n)return findMedianSortedArrays(nums2,nums1);
int l=0,r=m;
while(l<=r){ int px=(l+r)/2,py=(m+n+1)/2-px;
  int maxL1=(px?nums1[px-1]:INT_MIN),minR1=(px<m?nums1[px]:INT_MAX);
  int maxL2=(py?nums2[py-1]:INT_MIN),minR2=(py<n?nums2[py]:INT_MAX);
  if(maxL1<=minR2&&maxL2<=minR1){
    if((m+n)%2)return max(maxL1,maxL2);
    return(max(maxL1,maxL2)+min(minR1,minR2))/2.0; }
  else if(maxL1>minR2)r=px-1; else l=px+1; }
return 0;`,
        java: `if(m>n)return findMedianSortedArrays(nums2,nums1);
int l=0,r=m;
while(l<=r){ int px=(l+r)/2,py=(m+n+1)/2-px;
  int mxL1=px==0?Integer.MIN_VALUE:nums1[px-1];
  int mnR1=px==m?Integer.MAX_VALUE:nums1[px];
  int mxL2=py==0?Integer.MIN_VALUE:nums2[py-1];
  int mnR2=py==n?Integer.MAX_VALUE:nums2[py];
  if(mxL1<=mnR2&&mxL2<=mnR1){
    if((m+n)%2==1)return Math.max(mxL1,mxL2);
    return(Math.max(mxL1,mxL2)+Math.min(mnR1,mnR2))/2.0;}
  else if(mxL1>mnR2)r=px-1; else l=px+1;}
return 0;`
    },
    // ── GREEDY ────────────────────────────────────────────────────────────────────
    {
        id: 38, topic: 'Greedy', difficulty: 'Medium',
        title: 'Jump Game',
        logic: 'Track max reachable index. If i > maxReach at any point → false.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'maxReach=max(maxReach, i+nums[i]); return maxReach>=last index.',
        cpp: `int reach=0;
for(int i=0;i<n;i++){ if(i>reach)return false; reach=max(reach,i+nums[i]); }
return true;`,
        java: `int reach=0;
for(int i=0;i<nums.length;i++){ if(i>reach)return false; reach=Math.max(reach,i+nums[i]); }
return true;`
    },
    {
        id: 39, topic: 'Greedy', difficulty: 'Medium',
        title: 'Meeting Rooms II (Min Heap)',
        logic: 'Sort by start. Min-heap tracks end times. Pop if room free, else add.',
        tc: 'O(n log n)', sc: 'O(n)',
        tip: 'Heap size at end = min rooms needed.',
        cpp: `sort(intervals.begin(),intervals.end());
priority_queue<int,vector<int>,greater<int>> pq;
for(auto& iv:intervals){ if(!pq.empty()&&pq.top()<=iv[0])pq.pop(); pq.push(iv[1]); }
return pq.size();`,
        java: `Arrays.sort(intervals,(a,b)->a[0]-b[0]);
PriorityQueue<Integer> pq=new PriorityQueue<>();
for(int[] iv:intervals){ if(!pq.isEmpty()&&pq.peek()<=iv[0])pq.poll(); pq.add(iv[1]); }
return pq.size();`
    },
    // ── MATH / MISC ───────────────────────────────────────────────────────────────
    {
        id: 40, topic: 'Math', difficulty: 'Medium',
        title: 'Pow(x, n)',
        logic: 'Fast exponentiation: divide exponent by 2 each step recursively.',
        tc: 'O(log n)', sc: 'O(log n)',
        tip: 'If n is odd: x * pow(x, n-1); if even: pow(x*x, n/2).',
        cpp: `double myPow(double x,long n){
  if(n<0){x=1/x;n=-n;}
  if(n==0)return 1;
  if(n%2)return x*myPow(x,n-1);
  return myPow(x*x,n/2); }`,
        java: `public double myPow(double x,long n){
  if(n<0){x=1/x;n=-n;}
  if(n==0)return 1;
  if(n%2==1)return x*myPow(x,n-1);
  return myPow(x*x,n/2); }`
    },
    {
        id: 41, topic: 'Math', difficulty: 'Easy',
        title: 'Reverse Integer',
        logic: 'Extract digits with %10 and /10. Check overflow before multiplying.',
        tc: 'O(log n)', sc: 'O(1)',
        tip: 'Check INT_MAX/10 before rev*10 to detect overflow without long.',
        cpp: `int rev=0;
while(x){ int d=x%10; x/=10;
  if(rev>INT_MAX/10||(rev==INT_MAX/10&&d>7))return 0;
  if(rev<INT_MIN/10||(rev==INT_MIN/10&&d<-8))return 0;
  rev=rev*10+d; }
return rev;`,
        java: `int rev=0;
while(x!=0){ int d=x%10; x/=10;
  if(rev>Integer.MAX_VALUE/10||(rev==Integer.MAX_VALUE/10&&d>7))return 0;
  if(rev<Integer.MIN_VALUE/10||(rev==Integer.MIN_VALUE/10&&d<-8))return 0;
  rev=rev*10+d; }
return rev;`
    },
    {
        id: 42, topic: 'Stack/Queue', difficulty: 'Hard',
        title: 'Largest Rectangle in Histogram',
        logic: 'Monotonic increasing stack. Pop when shorter bar found, compute width.',
        tc: 'O(n)', sc: 'O(n)',
        tip: 'Append 0 sentinel. Width = i - stack[-2] - 1 after popping.',
        cpp: `stack<int> st; int ans=0;
heights.push_back(0);
for(int i=0;i<heights.size();i++){
  while(!st.empty()&&heights[i]<heights[st.top()]){
    int h=heights[st.top()];st.pop();
    int w=st.empty()?i:i-st.top()-1;
    ans=max(ans,h*w); }
  st.push(i); }
return ans;`,
        java: `Deque<Integer> st=new ArrayDeque<>(); int ans=0;
int[] h=Arrays.copyOf(heights,heights.length+1);
for(int i=0;i<h.length;i++){
  while(!st.isEmpty()&&h[i]<h[st.peek()]){
    int ht=h[st.pop()];
    int w=st.isEmpty()?i:i-st.peek()-1;
    ans=Math.max(ans,ht*w); }
  st.push(i); }
return ans;`
    },
    {
        id: 43, topic: 'Array', difficulty: 'Medium',
        title: 'Subarray Sum Equals K',
        logic: 'Prefix sum + hashmap. Check if (prefix - k) seen before.',
        tc: 'O(n)', sc: 'O(n)',
        tip: 'map[prefix-k] gives count of subarrays ending at i with sum=k.',
        cpp: `unordered_map<int,int> mp{{0,1}}; int sum=0,cnt=0;
for(int x:nums){ sum+=x; cnt+=mp[sum-k]; mp[sum]++; }
return cnt;`,
        java: `Map<Integer,Integer> map=new HashMap<>(); map.put(0,1); int sum=0,cnt=0;
for(int x:nums){ sum+=x; cnt+=map.getOrDefault(sum-k,0); map.merge(sum,1,Integer::sum); }
return cnt;`
    },
    {
        id: 44, topic: 'Tree', difficulty: 'Medium',
        title: 'Kth Smallest Element in BST',
        logic: 'Inorder traversal of BST gives sorted sequence. Return kth element.',
        tc: 'O(H+k)', sc: 'O(H)',
        tip: 'Inorder: left→process→right. Stop when k==0.',
        cpp: `int ans=-1,cnt=0;
function<void(TreeNode*)> dfs=[&](TreeNode* r){
  if(!r||cnt>k)return; dfs(r->left);
  if(++cnt==k)ans=r->val; dfs(r->right); };
dfs(root); return ans;`,
        java: `int[] cnt={0},ans={0};
dfs(root,k,cnt,ans); return ans[0];
void dfs(TreeNode r,int k,int[] cnt,int[] ans){
  if(r==null)return; dfs(r.left,k,cnt,ans);
  if(++cnt[0]==k)ans[0]=r.val; dfs(r.right,k,cnt,ans); }`
    },
    {
        id: 45, topic: 'DP', difficulty: 'Medium',
        title: 'Word Break',
        logic: 'dp[i]=true if s[0..i-1] can be segmented. Try all word lengths.',
        tc: 'O(n²)', sc: 'O(n)',
        tip: 'dp[0]=true; for each i, check dp[j]&&dict.has(s[j..i]).',
        cpp: `int n=s.size(); vector<bool> dp(n+1,false); dp[0]=true;
set<string> ws(wordDict.begin(),wordDict.end());
for(int i=1;i<=n;i++) for(int j=0;j<i;j++)
  if(dp[j]&&ws.count(s.substr(j,i-j))){dp[i]=true;break;}
return dp[n];`,
        java: `int n=s.length(); boolean[] dp=new boolean[n+1]; dp[0]=true;
Set<String> ws=new HashSet<>(wordDict);
for(int i=1;i<=n;i++) for(int j=0;j<i;j++)
  if(dp[j]&&ws.contains(s.substring(j,i))){dp[i]=true;break;}
return dp[n];`
    },
    {
        id: 46, topic: 'Graph', difficulty: 'Medium',
        title: 'Pacific Atlantic Water Flow',
        logic: 'BFS/DFS from ocean borders inward; cells reachable from both = answer.',
        tc: 'O(m·n)', sc: 'O(m·n)',
        tip: 'Reverse thinking: water flows UP from ocean. BFS from all border cells.',
        cpp: `vector<vector<bool>> pac(m,vector<bool>(n,false)),atl=pac;
function<void(int,int,vector<vector<bool>>&)> bfs=[&](int r,int c,auto& vis){
  queue<pair<int,int>> q; q.push({r,c}); vis[r][c]=true;
  int dx[]={0,0,1,-1},dy[]={1,-1,0,0};
  while(!q.empty()){ auto[x,y]=q.front();q.pop();
    for(int d=0;d<4;d++){ int nx=x+dx[d],ny=y+dy[d];
      if(nx>=0&&nx<m&&ny>=0&&ny<n&&!vis[nx][ny]&&heights[nx][ny]>=heights[x][y])
        {vis[nx][ny]=true;q.push({nx,ny});} } } };
// call bfs from all Pacific border cells, then all Atlantic border cells`,
        java: `// BFS from borders; collect intersection of pacific & atlantic reachable cells`
    },
    {
        id: 47, topic: 'String', difficulty: 'Medium',
        title: 'Encode and Decode Strings',
        logic: 'Prefix each string with "length#". Decode by reading length until #.',
        tc: 'O(n)', sc: 'O(n)',
        tip: 'Delimiter trick: "4#word" — read digits before #, then that many chars.',
        cpp: `// Encode:
string encode(vector<string>& strs){ string s;
  for(auto& w:strs)s+=to_string(w.size())+"#"+w; return s; }
// Decode:
vector<string> decode(string s){ vector<string> res; int i=0;
  while(i<s.size()){ int j=s.find('#',i); int len=stoi(s.substr(i,j-i));
    res.push_back(s.substr(j+1,len)); i=j+1+len; } return res; }`,
        java: `public String encode(List<String> strs){ StringBuilder sb=new StringBuilder();
  for(String s:strs)sb.append(s.length()).append('#').append(s); return sb.toString(); }
public List<String> decode(String s){ List<String> res=new ArrayList<>();
  int i=0; while(i<s.length()){ int j=s.indexOf('#',i);
    int len=Integer.parseInt(s.substring(i,j));
    res.add(s.substring(j+1,j+1+len)); i=j+1+len; } return res; }`
    },
    {
        id: 48, topic: 'DP', difficulty: 'Hard',
        title: 'Burst Balloons',
        logic: 'Interval DP: dp[l][r]=max coins bursting all in (l,r). Try each as last burst.',
        tc: 'O(n³)', sc: 'O(n²)',
        tip: 'Add 1-boundary balloons. Last burst k in range: nums[l]*nums[k]*nums[r] + dp[l][k]+dp[k][r].',
        cpp: `vector<int> nums={1,balloon,1}; // add boundaries
int n=nums.size(); vector<vector<int>> dp(n,vector<int>(n,0));
for(int len=2;len<n;len++) for(int l=0;l<n-len;l++){ int r=l+len;
  for(int k=l+1;k<r;k++)
    dp[l][r]=max(dp[l][r],nums[l]*nums[k]*nums[r]+dp[l][k]+dp[k][r]); }
return dp[0][n-1];`,
        java: `// same DP pattern with Java 2D array`
    },
    {
        id: 49, topic: 'Greedy', difficulty: 'Medium',
        title: 'Gas Station',
        logic: 'If total gas >= total cost, solution exists. Start where running sum first goes negative.',
        tc: 'O(n)', sc: 'O(1)',
        tip: 'Track total and running sum. Reset start when tank<0.',
        cpp: `int total=0,tank=0,start=0;
for(int i=0;i<n;i++){ total+=gas[i]-cost[i]; tank+=gas[i]-cost[i];
  if(tank<0){start=i+1;tank=0;} }
return total>=0?start:-1;`,
        java: `int total=0,tank=0,start=0;
for(int i=0;i<n;i++){ total+=gas[i]-cost[i]; tank+=gas[i]-cost[i];
  if(tank<0){start=i+1;tank=0;} }
return total>=0?start:-1;`
    },
    {
        id: 50, topic: 'Graph', difficulty: 'Medium',
        title: 'Word Ladder',
        logic: 'BFS from beginWord. Try all 1-char mutations; use wordSet for O(1) lookup.',
        tc: 'O(n·L²)', sc: 'O(n·L)',
        tip: 'BFS levels = shortest path. Remove word from set when visited to avoid cycles.',
        cpp: `unordered_set<string> ws(wordList.begin(),wordList.end());
queue<string> q; q.push(beginWord); int steps=1;
while(!q.empty()){ int sz=q.size();
  while(sz--){ string cur=q.front();q.pop();
    if(cur==endWord)return steps;
    for(int i=0;i<cur.size();i++) for(char c='a';c<='z';c++){
      string nw=cur; nw[i]=c;
      if(ws.count(nw)){ws.erase(nw);q.push(nw);} } }
  steps++; }
return 0;`,
        java: `Set<String> ws=new HashSet<>(wordList);
Queue<String> q=new LinkedList<>(); q.add(beginWord); int steps=1;
while(!q.isEmpty()){ int sz=q.size();
  while(sz-->0){ String cur=q.poll();
    if(cur.equals(endWord))return steps;
    for(int i=0;i<cur.length();i++) for(char c='a';c<='z';c++){
      String nw=cur.substring(0,i)+c+cur.substring(i+1);
      if(ws.contains(nw)){ws.remove(nw);q.add(nw);} } }
  steps++; }
return 0;`
    },
];
