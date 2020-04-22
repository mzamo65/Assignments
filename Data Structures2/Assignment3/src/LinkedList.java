

public class LinkedList{
  Node head;
  
  public class Node{
    private String data;
    private Node next;
    public Node(){
      data = null;
      next = null;
    }

    public Node(String d, Node n){
      data=d;
      next=n;
    }

    public String getData(){
      return data;
    }
 
    public Node getLink(){
      return next;
    }
  }

  public LinkedList(){
    head = null;
  }

  public void addToStart(String data){
    head = new Node(data,head);
  }

  public String getLLData(){
    return head.getData();
  }  

  public void printList(){
    Node pos = head;
    while(pos != null){
      System.out.println(pos.getData());
      pos = pos.getLink();
    }
  }

  public Node next(Node n){
    if(n.getLink() != null){
      return n.getLink();
    }
    return null;
  }

  public Node next(){
    Node pos = head;
    if(pos.getLink() != null){
      pos = pos.getLink();
    }  
    return pos;
  }
}
